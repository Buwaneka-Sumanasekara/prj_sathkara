/**
 * Test Screen Container
 */
import { connect } from 'react-redux';

//actions
import * as eventActions from '../../../redux/event/action';

// The component we're mapping to
import DashboardView from './DashboardView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    liveEvent:state.event.liveEvent
});

// Any actions to map to the component?
const mapDispatchToProps = {
    loadCurrentEvent:eventActions.loadCurrentEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
