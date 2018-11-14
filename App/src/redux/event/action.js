import {  database } from '../../constants/firebase';

export function loadCurrentEvent() {
   console.log(`called loadCurrentEvent`)
    return async dispatch => {
      let userref = database.ref(`events`);
      userref.orderByChild('active').equalTo(true).on("value", function(snapshot) {
       // console.log(snapshot.val());
        snapshot.forEach(function(data) {
         // console.log(JSON.stringify(data));
          dispatch({ type: 'EVENT_SET', liveEvent: data.val() });
        });
      
    });
      
    }
}