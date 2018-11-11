/**
 * Test Screen Container
 */
import { connect } from 'react-redux';




// The component we're mapping to
import LoginView from './LoginView';

//Actions



// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
});

// Any actions to map to the component?
const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
