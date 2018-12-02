import { database } from '../../constants/firebase';


export function updateNotificationToken(uid) {
  return async dispatch => {
    let tokenref = database.ref(`user-notif-tokens/${uid}`);
    const tokenr= await tokenref.once("value");
   let tokenobj= tokenr.val();
    console.log(`Update token redux:${tokenobj.token}`)
    dispatch({ type: 'NOTIF_TOKEN_UPDATE', token: tokenobj.token });
  }
}

export function updateNotifications(uid) {
  return async dispatch => {
    try {
      let notif_topics_ref = database.ref(`notifications/topics`);
      notif_topics_ref.once("value", async function (snap) {
        if (snap.val() !== null) {
          try {
            let ar = Object.keys(snap.val()).map(i => snap.val()[i]);
            const snap2 = await notif_topics_ref.orderByChild('isseen').equalTo(false).once("value");
            let arseen = Object.keys(snap2.val()).map(i => snap2.val()[i]);
            dispatch({ type: 'NOTIF_TOPIC_UPDATE', notif_topic: ar, notif_topic_count: arseen.length });
          } catch (error) {

          }
        }
      });

      notif_topics_ref.on("value", async function (snap) {
        if (snap.val() !== null) {
          try {
            let ar = Object.keys(snap.val()).map(i => snap.val()[i]);
            const snap2 = await notif_topics_ref.orderByChild('isseen').equalTo(false).once("value");
            let arseen = Object.keys(snap2.val()).map(i => snap2.val()[i]);
            dispatch({ type: 'NOTIF_TOPIC_UPDATE', notif_topic: ar, notif_topic_count: arseen.length });
          } catch (error) {

          }

        }
      });

      let notif_private_ref = database.ref(`notifications/users/${uid}`);
      notif_private_ref.once("value", async function (snap) {
        if (snap.val() !== null) {
          try {
            let ar = Object.keys(snap.val()).map(i => snap.val()[i]);
            const snap2 = await notif_private_ref.orderByChild('isseen').equalTo(false).once("value");
            let arseen = Object.keys(snap2.val()).map(i => snap2.val()[i]);
            dispatch({ type: 'NOTIF_USER_UPDATE', notif_private: ar, notif_private_count: arseen.length });
          } catch (error) {

          }

        }


      });
      notif_private_ref.on("value", async function (snap) {
        if (snap.val() !== null) {
          try {
            let ar = Object.keys(snap.val()).map(i => snap.val()[i]);
            const snap2 = await notif_private_ref.orderByChild('isseen').equalTo(false).once("value");
            let arseen = Object.keys(snap2.val()).map(i => snap2.val()[i]);
            dispatch({ type: 'NOTIF_USER_UPDATE', notif_private: ar, notif_private_count: arseen.length });
          } catch (error) {

          }

        }
      });
    } catch (error) {
      console.log(`Error in notf load: ${error}`)
    }




  }
}


