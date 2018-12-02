/**
 * Test Screen Container
 */
import { connect } from 'react-redux';




// The component we're mapping to
import NotifView from './NotifView';

//Actions
import * as notifActions from '../../../redux/notifications/action';


// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  uid:state.auth.user.id,
  notif_private_count: state.notifications.notif_private_count,
  notif_topic_count: state.notifications.notif_topic_count,
  notif_private: state.notifications.notif_private,
  notif_topic: state.notifications.notif_topic
});

// Any actions to map to the component?
const mapDispatchToProps = {
  updateNotifications:notifActions.updateNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifView);
