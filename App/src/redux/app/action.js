import { database } from '../../constants/firebase';


export function updateAppLiveInfo() {
  return async dispatch => {
    let appliveinforef = database.ref(`app-live-info`);
    appliveinforef.on("value", function (snapshot) {
      dispatch({ type: 'UPDATE_LIVE_INFO', liveinfo: snapshot.val() });

    });
  }
}

