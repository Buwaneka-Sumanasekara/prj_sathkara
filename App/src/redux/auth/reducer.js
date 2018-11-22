
export const initialState = {
    isLoading: false,
    isAuthenticated: false,
    isAuthChecking: false,
    user: {},
    message: { msg_type: '', msg_txt: '' }
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "AUTH_IS_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        case "AUTH_REGISTER":
            return {
                ...state,
                message: action.message
            };
        case "AUTH_LOGIN":
            return {
                ...state,
                message: action.message
            };
        case "AUTH_CHECKING_START":
            return {
                ...state,
                isAuthenticated: false,
                isAuthChecking: action.isLoading,
                isLoading: false
            };
        case "AUTH_CHECKING":
            return {
                ...state,
                isAuthChecking: action.isLoading,
                isLoading: false
            };
        case "AUTH_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                user: action.user,
                isLoading: false
            };
        case "AUTH_LOGOUT_START":
            return {
                ...state,
                isAuthChecking: action.isLoading
            };
        case "AUTH_FAILD":
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                isLoading: false,
                isAuthChecking:false
            };

        default:
            return state;
    }
}
