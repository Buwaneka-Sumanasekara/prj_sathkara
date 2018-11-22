
export const initialState = {
    isLoading: false,
    saveError: '',
    currentdonation: 0,
    currentdonations:[]
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "DONATION_LOADING":
            return {
                ...state,
                isLoading: action.isLoading,
                saveError: action.error
            };
        case "DONATION_UPDATE_USER_TOTAL":
            return {
                ...state,
                currentdonation:action.currentdonation
            };
            case "DONATION_UPDATE_USER_DON":
            return {
                ...state,
                currentdonations:action.currentdonations
            };


        default:
            return state;
    }
}
