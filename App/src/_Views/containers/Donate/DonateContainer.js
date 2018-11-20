/**
 * Test Screen Container
 */
import { connect } from 'react-redux';




// The component we're mapping to
import DonateView from './DonateView';

//Actions
import * as AppActions from '../../../redux/app/action';


// What data from the store shall we send to the component?
const mapStateToProps = state => ({

});

// Any actions to map to the component?
const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(DonateView);
