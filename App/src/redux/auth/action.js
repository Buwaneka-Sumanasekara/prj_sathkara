import { auth, database } from '../../constants/firebase';

function createUser(user) {
  let obj = {};
  obj['id'] = user.id;
  obj['fname'] = user.fname;
  obj['lname'] = user.lname;
  obj['mobile'] = user.mobile;
  obj['email'] = user.email;
  obj['user_type'] = 0;
  return obj;
}

function saveUserToDatabase(dispatch, user) {
  let userref = database.ref("user");
  userref.child(user.id).set(user, function (error) {
    let status = '';
    let msg = '';
    if (error) {
      status = 'SIGNUP';
      msg = error;
    } else {
      status = 'SIGNUP_S';
      msg = 'your registerd successfully!,Please sign-in ..';

    }
    dispatch({ type: 'AUTH_IS_LOADING', isLoading: false });
    dispatch({
      type: 'AUTH_REGISTER',
      message: { msg_type: status, msg_txt: msg }
    });
  });
}

function setUserToRedux(dispatch, user) {
  console.log(`${JSON.stringify(user.uid)}`);
  let userref = database.ref(`user/${user.uid}`);
  //userref.child(user.uid)
  userref.once("value", function (snap) {
    console.log(snap);
    dispatch({ type: 'AUTH_CHECKING', isLoading: false });
    dispatch({ type: 'AUTH_SUCCESS', user: snap.val() });
    
  });
}


export function registerUser(user) {
  return async dispatch => {
    dispatch({ type: 'AUTH_IS_LOADING', isLoading: true });
    dispatch({ type: 'AUTH_REGISTER', message: { msg_type: '', msg_txt: '' } });

    auth.createUserWithEmailAndPassword(user.email, user.pass)
      .then(authUser => {
        console.info(authUser.user.uid);
        let usermod = user;
        usermod['id'] = authUser.user.uid;
        saveUserToDatabase(dispatch, createUser(usermod));
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'AUTH_IS_LOADING', isLoading: false });
        dispatch({ type: 'AUTH_REGISTER', message: { msg_type: 'SIGNUP', msg_txt: error.message } });
      });
  }
}


export function loginUser(user) {
  return async dispatch => {
    dispatch({ type: 'AUTH_IS_LOADING', isLoading: true });
    dispatch({ type: 'AUTH_LOGIN', message: { msg_type: '', msg_txt: '' } });

    auth.signInWithEmailAndPassword(user.email, user.pass)
      .then(authUser => {
        console.info(authUser);
        dispatch({ type: 'AUTH_IS_LOADING', isLoading: false });
        dispatch({ type: 'AUTH_LOGIN', message: { msg_type: 'LOGIN_S', msg_txt: 'Success' } });
        
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'AUTH_IS_LOADING', isLoading: false });
        dispatch({ type: 'AUTH_LOGIN', message: { msg_type: 'LOGIN', msg_txt: error.message } });
      });

  }
}

export function authCheck() {
  return async dispatch => {
    dispatch({ type: 'AUTH_CHECKING_START', isLoading: true });
    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        setUserToRedux(dispatch, authUser)
      } else {
        dispatch({ type: 'AUTH_CHECKING', isLoading: false });
        dispatch({ type: 'AUTH_FAILD' });
      }
    });
  }
}


export function authLogout() {
  return async dispatch => {
    dispatch({ type: 'AUTH_LOGOUT_START', isLoading: true });
    
    auth.signOut().then(function () {
    
        dispatch({ type: 'AUTH_FAILD' });
        dispatch({ type: 'AUTH_LOGOUT_START', isLoading: false });
    }, function (error) {
      console.error('Sign Out Error', error);
      dispatch({ type: 'AUTH_LOGOUT_START', isLoading: false });
    });
  }
}