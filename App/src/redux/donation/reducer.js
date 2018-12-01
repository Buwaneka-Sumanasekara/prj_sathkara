
export const initialState = {
    isLoading: false,
    saveError: '',
    currentdonation: 0,
    currentdonations: [],
    isReciptUploading: false,
    uploadError: '',
    currentDonations_All_Pending: [],
    currentDonations_All_changed: [],
    isAllDonationsLoading: false
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "DONATION_LOADING":
            return {
                ...state,
                isLoading: action.isLoading,
                saveError: action.error
            };
        case "DONATION_RECIPT_UPDATING":
            return {
                ...state,
                isReciptUploading: action.isLoading,
                uploadError: action.error
            };
        case "DONATION_UPDATE_USER_TOTAL":
            return {
                ...state,
                currentdonation: action.currentdonation
            };
        case "DONATION_UPDATE_USER_DON":
            return {
                ...state,
                currentdonations: action.currentdonations
            };
        case "DONATION_ALL_LOADING":
            return {
                ...state,
                isAllDonationsLoading: action.isLoading,

            };
        case "DONATION_LOAD_ALL":
            return {
                ...state,
                currentDonations_All_Pending: action.arPending,
                currentDonations_All_changed: action.arChanged
            };


        default:
            return state;
    }
}
