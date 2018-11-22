
export const initialState = {
    isLoading: false,
    liveinfo:{}
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "IS_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        case "UPDATE_LIVE_INFO":
            return {
                ...state,
                liveinfo: action.liveinfo
            };

        default:
            return state;
    }
}
