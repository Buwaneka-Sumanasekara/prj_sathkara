/**
 * Test Screen Container
 */
import { connect } from 'react-redux';




// The component we're mapping to
import DonateView from './DonateView';

//Actions
import * as eventActions from '../../../redux/event/action';
import * as DonationActions from '../../../redux/donation/action';


// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    uid:state.auth.user.id,
    isLoading_save:state.donation.isLoading,
    saveError:state.donation.saveError,
    liveEvent:state.event.liveEvent,
    currentdonations:state.donation.currentdonations,
    isReciptUploading:state.donation.isReciptUploading,
    uploadError:state.donation.uploadError
});

// Any actions to map to the component?
const mapDispatchToProps = {
    loadCurrentEvent:eventActions.loadCurrentEvent,
    saveDonation:DonationActions.saveDonation,
    updateSelfDonationsList:DonationActions.updateSelfDonationsList,
    uploadDonationImgOnlyAction:DonationActions.uploadDonationImgOnlyAction
};

export default connect(mapStateToProps, mapDispatchToProps)(DonateView);
