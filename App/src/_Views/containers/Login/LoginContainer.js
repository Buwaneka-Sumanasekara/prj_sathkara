/**
 * Test Screen Container
 */
import { connect } from 'react-redux';
// The component we're mapping to
import LoginView from './LoginView';

//Actions
import * as authActions from '../../../redux/auth/action';


// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.isAuthChecking,
    isLoading:state.auth.isLoading,
    message:state.auth.message
});

// Any actions to map to the component?
const mapDispatchToProps = {
   registerUser:authActions.registerUser,
   loginUser:authActions.loginUser,
   authCheck: authActions.authCheck,
   signInWithGoogle:authActions.signInWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
