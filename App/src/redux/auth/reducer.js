
export const initialState = {
    isLoading: false,
    isAuthenticated:false,
    user:{}
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "IS_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        case "AUTHENTICATE":
            return {
                ...state,
                isAuthenticated:true,
                user:action.user
            };

        default:
            return state;
    }
}
