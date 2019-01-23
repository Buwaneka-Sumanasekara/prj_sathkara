/**
 * Test Screen Container
 */
import { connect } from 'react-redux';

//actions
import * as eventActions from '../../../redux/event/action';
import * as appActions from '../../../redux/app/action';
import * as donationActions from '../../../redux/donation/action';
import * as notifActions from '../../../redux/notifications/action';


// The component we're mapping to
import DashboardView from './DashboardView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    uid:state.auth.user.id,
    liveEvent:state.event.liveEvent,
    liveinfo:state.app.liveinfo,
    currentdonation:state.donation.currentdonation,
    isAuthenticated: state.auth.isAuthenticated
});

// Any actions to map to the component?
const mapDispatchToProps = {
    loadCurrentEvent:eventActions.loadCurrentEvent,
    updateAppLiveInfo:appActions.updateAppLiveInfo,
    updateSelfDonations:donationActions.updateSelfDonations,
    updateNotifications:notifActions.updateNotifications,
    updateNotificationToken:notifActions.updateNotificationToken
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
