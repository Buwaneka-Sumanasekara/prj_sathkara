import * as admin from 'firebase-admin';

export async function getEventsDonations(req, res) {
    try {
        const eventid = req.params.eventid;
        if (eventid !== undefined) {
            const donations = await admin.database().ref(`donations/${eventid}`).once("value");
            const donationsArray = Object.keys(donations.val()).map(i => donations.val()[i]);

            
            const PendingAr = [];
            const OtherAr = [];

            for (let userdonations of donationsArray) {
                const transactionsArray = Object.keys(userdonations).map(i => userdonations[i]);
                //console.log(transactionsArray); 
                for (let transaction of transactionsArray) {
                    const user = await admin.database().ref(`user/${transaction.uid}`).once("value");
                    transaction['user']=user.val();

                    if (transaction['donation-state'] === 0) {

                        PendingAr.push(transaction);
                    }else{
                        OtherAr.push(transaction);
                    }
                }
            }

            const resObj={};
            resObj['msg']='Success';
            resObj['pending_ar']=PendingAr;
            resObj['other_ar']=OtherAr;


            res.status(200).send(resObj);
        }else{
            res.status(500).send({ 'msg': "Missing parameters" });
        }

     
    } catch (error) {
        res.status(500).send({ 'msg': `Something wrong in ur request:${error} ` });
    }

}