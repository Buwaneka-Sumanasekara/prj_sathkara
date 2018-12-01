import { database, storage, firebase } from '../../constants/firebase';
var _ = require('lodash');

function getDonationImgId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + s4() + s4();
}

function getDonationObj(obj) {
  let objnw = {};
  objnw['eventid'] = obj.eventid;
  objnw['uid'] = obj.uid;
  objnw['amount'] = parseFloat(obj.amt);
  objnw['donation-state'] = 0; //0=pending,1=aproved,2=cancelled
  objnw['crdate'] = firebase.database.ServerValue.TIMESTAMP;


  if (obj.id !== undefined) {
    objnw['id'] = obj.id;
    objnw['imgurl'] = obj.imgurl;
    objnw['imgurl-available'] = obj['imgurl-available'];
  }


  return objnw;
}

function updateDonation(dispatch, trnid, imgurl, obj) {
  let donref = database.ref(`donations/${obj.eventid}/${obj.uid}/${trnid}`);
  let upobj = obj;
  upobj['id'] = trnid;
  upobj['imgurl'] = imgurl;
  if (imgurl === '') {
    upobj['imgurl-available'] = false;
  } else {
    upobj['imgurl-available'] = true;
  }
  donref.set(getDonationObj(upobj), function (er) {
    if (er) {
      alert("Data could not be saved." + er);
      dispatch({ type: 'DONATION_LOADING', error: "Data could not be saved." + er, isLoading: false });
    } else {
      dispatch({ type: 'DONATION_LOADING', error: '', isLoading: false });
    }
  });

}

export function saveDonation(obj) {

  return async dispatch => {
    try {
      dispatch({ type: 'DONATION_LOADING', error: '', isLoading: true });

      let donref = database.ref(`donations/${obj.eventid}/${obj.uid}`);
      var newdonref = donref.push(getDonationObj(obj));
      var postID = newdonref.key;

      if (obj.img !== null) {
        let genImgName = getDonationImgId();
        let file = obj.img;
        let fileName = obj.img.name;
        let filetyp = obj.img.type;

        var metadata = {
          contentType: filetyp
        };

        console.log(`File name:${genImgName}.${filetyp}`)
        var storageRef = storage.ref();

        var uploadTask = storageRef.child(`donations/${genImgName}.${fileName.split('.')[1]}`).put(file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                dispatch({ type: 'DONATION_LOADING', error: 'Storage Unothorized', isLoading: false });
                break;

              case 'storage/canceled':
                // User canceled the upload
                dispatch({ type: 'DONATION_LOADING', error: 'Storage Cancel', isLoading: false });
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse;
                dispatch({ type: 'DONATION_LOADING', error: 'Unkonwn', isLoading: false });
                break;
            }
          }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File available at', downloadURL);
              updateDonation(dispatch, postID, downloadURL, obj)
            });
          });


      } else {
        //no image
        console.log(`no image`)
        updateDonation(dispatch, postID, '', obj);
      }

    } catch (error) {
      dispatch({ type: 'DONATION_LOADING', error: error.message, isLoading: false });
    }

  }
}


export function updateSelfDonations(eventid, uid) {
  return async dispatch => {
    let userref = database.ref(`donations/${eventid}/${uid}`);
    userref.on("value", function (donations) {
      let amount = 0;
      let ar = _.toArray(donations.val())
      console.log(ar);
      for (let don of ar) {
        if (don['donation-state'] !== 2) {//not cancelled
          amount += don.amount;
        }
      }
      dispatch({ type: 'DONATION_UPDATE_USER_TOTAL', currentdonation: amount });

    });

  }
}

export function updateSelfDonationsList(eventid, uid) {
  return async dispatch => {
    console.log(`donations/${eventid}/${uid}`)
    let userref = database.ref(`donations/${eventid}/${uid}`);
    userref.on("value", function (donations) {
      let amount = 0;
      let ar = _.toArray(donations.val())

      dispatch({ type: 'DONATION_UPDATE_USER_DON', currentdonations: ar });

    });

  }
}

export function uploadDonationImgOnlyAction(obj) {
  return async dispatch => {
    console.log(`Don id :${obj.id}`)
    dispatch({ type: 'DONATION_RECIPT_UPDATING', error: '', isLoading: true });
    if (obj.img !== null) {
      let genImgName = getDonationImgId();
      let file = obj.img;
      let fileName = obj.img.name;
      let filetyp = obj.img.type;

      var metadata = {
        contentType: filetyp
      };

      console.log(`File name:${genImgName}.${filetyp}`)
      var storageRef = storage.ref();

      var uploadTask = storageRef.child(`donations/${genImgName}.${fileName.split('.')[1]}`).put(file, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function (error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              dispatch({ type: 'DONATION_RECIPT_UPDATING', error: 'Storage Unothorized', isLoading: false });
              break;

            case 'storage/canceled':
              // User canceled the upload
              dispatch({ type: 'DONATION_RECIPT_UPDATING', error: 'Storage Cancel', isLoading: false });
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse;
              dispatch({ type: 'DONATION_RECIPT_UPDATING', error: 'Unkonwn', isLoading: false });
              break;
          }
        }, function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            uploadDonationImgOnly(dispatch,downloadURL,obj);
          });
        });
    }else{
      dispatch({ type: 'DONATION_RECIPT_UPDATING', error: 'Please select your file', isLoading: false });
    }
  }
}

function uploadDonationImgOnly(dispatch,imgurl,obj) {
  console.log(`donations/${obj.eventid}/${obj.uid}/${obj.id}`)
  let donref = database.ref(`donations/${obj.eventid}/${obj.uid}/${obj.id}`);
  let upobj = obj;
  upobj['imgurl'] = imgurl;
  upobj['imgurl-available'] = true;

  donref.update(upobj, function (er) {
    if (er) {
      
      dispatch({ type: 'DONATION_RECIPT_UPDATING', error: `Update details faild ${er}`, isLoading: false });
    } else {
      dispatch({ type: 'DONATION_RECIPT_UPDATING', error: '', isLoading: false });
    }
  });
}