/**
 * Test Screen Container
 */
import { connect } from 'react-redux';




// The component we're mapping to
import TestView from './TestView';

//Actions
import * as AppActions from '../../../redux/app/action';


// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  mymarks:state.app.value
});

// Any actions to map to the component?
const mapDispatchToProps = {
   multiplyValue:AppActions.addMarks
};

export default connect(mapStateToProps, mapDispatchToProps)(TestView);
