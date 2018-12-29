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
        const tokenadmin = req.body.token;

        console.log(`updateDonationState Response:${JSON.stringify(req.body)} `)

        if (eventid !== undefined && uid !== undefined && trnid !== undefined) {
            console.log(`inside:${JSON.stringify(req.body)} `)
            const donationRef = await admin.database().ref(`donations/${eventid}/${uid}/${trnid}`);

            await donationRef.update({
                "donation-state": donstate
            });

            await commonfun.saveNotifications(false, uid, tokenadmin, 'Donation Approval', 'Donation state has been Updated!', 'http://teamsathkara.org/donations');
               

            const notifObj = await admin.database().ref(`user-notif-tokens/${uid}`).once("value");
            const notiftoken=notifObj.val();
            if (notiftoken!==null && notiftoken.token!==null && notiftoken.token!==undefined) {
                const token=notiftoken.token;
                if (donstate === 1) {
                    console.log(`Don state:${donstate}`)
                    await commonfun.saveNotifications(false, uid, token, 'Donation Approval', 'Thank you,Your donation has been Approved by the Admin', 'http://teamsathkara.org/donations');
                } else if (donstate === 2) {
                    console.log(`Don state:${donstate}`)
                    await commonfun.saveNotifications(false, uid, token, 'Donation Cancel', 'Your donation has been cancelled by the Admin', 'http://teamsathkara.org/donations');
                } else if (donstate === 0) {
                    console.log(`Don state:${donstate}`)
                    await commonfun.saveNotifications(false, uid, token, 'Donation Reset', 'Your donation has been reseted by the Admin', 'http://teamsathkara.org/donations');
                } else {
                    console.log(`exc Don state:${donstate}`)
                }
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
