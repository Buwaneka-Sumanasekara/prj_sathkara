import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const calculateExpectRecivedAmounts = functions.database.ref('/donations')
    .onWrite(async evt => {

        const eventsref = admin.database().ref(`events`);
        const snapshot = await eventsref.orderByChild('active').equalTo(true).once("value");

        let liveEvent = null;
        for (const key in snapshot.val()) {
            liveEvent = snapshot.val()[key];
        }
        try {
            const donations = await admin.database().ref(`donations/${liveEvent.id}`).once("value");

            let expectAmount = 0;
            let recivedAmount = 0;
            const donationsArray = Object.keys(donations.val()).map(i => donations.val()[i])


            for (let userdonations of donationsArray) {
                const transactionsArray = Object.keys(userdonations).map(i => userdonations[i]);
                //console.log(transactionsArray); 
                for (let transaction of transactionsArray) {
                    if (transaction['donation-state'] === 1) {
                        recivedAmount += transaction.amount;
                    } else if (transaction['donation-state'] === 0) {
                        expectAmount += transaction.amount;
                    }
                }
            }


            console.log(`Expect:${expectAmount}, recived:${recivedAmount}`);
            const evntref = admin.database().ref(`events/${liveEvent.id}`);
            await evntref.update({
                "total-expect": expectAmount,
                "total-recived": recivedAmount,
                "total-contributors": donationsArray.length
            });
        } catch (error) {
            const evntref = admin.database().ref(`events/${liveEvent.id}`);
            await evntref.update({
                "total-expect": 0,
                "total-recived": 0,
                "total-contributors": 0
            });
        }

    });


export const updateMembers = functions.database.ref('/user')
    .onWrite(async evt => {
        try {
          
            const users = await admin.database().ref(`user`).once("value");
            const usersArray = Object.keys(users.val()).map(i => users.val()[i]);
            console.log(`Member updated! Members:${usersArray.length}`);
            const AppLiveInforef = admin.database().ref(`app-live-info`);
            await AppLiveInforef.update({
                "users-all": usersArray.length
            });
        } catch (error) {
            console.error(`Error in updateMembers ${error}`)
        }

    });