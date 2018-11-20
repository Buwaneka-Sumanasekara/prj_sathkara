/**
 * Test Screen Container
 */
import { connect } from 'react-redux';




// The component we're mapping to
import DonateView from './DonateView';

//Actions
import * as DonationActions from '../../../redux/donation/action';


// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    uid:state.auth.user.id,
    isLoading_save:state.donation.isLoading,
    saveError:state.donation.saveError,
    liveEvent:state.event.liveEvent
});

// Any actions to map to the component?
const mapDispatchToProps = {
    saveDonation:DonationActions.saveDonation
};

export default connect(mapStateToProps, mapDispatchToProps)(DonateView);
