
export const initialState = {
    isLoading: false,
    saveError:''
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "DONATION_LOADING":
            return {
                ...state,
                isLoading: action.isLoading,
                saveError:action.error
            };
       

        default:
            return state;
    }
}
