
export const initialState = {
    isLoading: false,
    
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "DONATION_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
       

        default:
            return state;
    }
}
