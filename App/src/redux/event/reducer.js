
export const initialState = {
    isLoading: false,
    liveEvent:{}
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "EVENT_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        case "EVENT_SET":
            return {
                ...state,
                liveEvent: action.liveEvent
            };

        default:
            return state;
    }
}
