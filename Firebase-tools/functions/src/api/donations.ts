import * as admin from 'firebase-admin';
import * as commonfun from '../common';


export async function getEventsDonations(req, res) {
    try {
        const eventid = req.params.eventid;
        if (eventid !== undefined) {
            const donations = await admin.database().ref(`donations/${eventid}`).once("value");
            const donationsArray = Object.keys(donations.val()).map(i => donations.val()[i]);


            const PendingAr = [];
            const OtherAr = [];

            for (const userdonations of donationsArray) {
                const transactionsArray = Object.keys(userdonations).map(i => userdonations[i]);
                //console.log(transactionsArray); 
                for (const transaction of transactionsArray) {
                    const user = await admin.database().ref(`user/${transaction.uid}`).once("value");
                    transaction['user'] = user.val();

                    if (transaction['donation-state'] === 0) {

                        PendingAr.push(transaction);
                    } else {
                        OtherAr.push(transaction);
                    }
                }
            }

            const resObj = {};
            resObj['msg'] = 'Success';
            resObj['pending_ar'] = PendingAr;
            resObj['other_ar'] = OtherAr;


            res.status(200).send(resObj);
        } else {
            res.status(400).send({ 'msg': "Missing parameters" });
        }


    } catch (error) {
        res.status(500).send({ 'msg': `Something wrong in ur request:${error} ` });
    }

}


export async function updateDonationState(req, res) {
    try {
        const eventid = req.body.eventid;
        const uid = req.body.uid;
        const trnid = req.body.trnid;
        const donstate = req.body.donstate;
        const token = req.body.token;
        if (eventid !== undefined && uid !== undefined && trnid !== undefined && token!==undefined) {
            const donationRef = await admin.database().ref(`donations/${eventid}/${uid}/${trnid}`);

            await donationRef.update({
                "donation-state":donstate
            });

            if(donstate==='1'){
                await commonfun.saveNotifications(false,uid,token,'Thanks you!','Your donation is Approved by the Org','http://teamsathkara.org/donations');
            }else if(donstate==='2'){
                await commonfun.saveNotifications(false,uid,token,'H!','Your donation is cancelled by the Admin','http://teamsathkara.org/donations');
            }else if(donstate==='0'){
                await commonfun.saveNotifications(false,uid,token,'H!','Your donation is reseted by the Admin','http://teamsathkara.org/donations');
            }
          
            const resObj = {};
            resObj['msg'] = 'State changed Success!';
            res.status(200).send(resObj);

        } else {
            res.status(400).send({ 'msg': "Missing parameters" });
        }



    } catch (error) {
        res.status(500).send({ 'msg': `Something wrong in ur request:${error} ` });
    }

}
