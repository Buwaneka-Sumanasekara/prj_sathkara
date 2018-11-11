
export const initialState = {
    isLoading: false,
    value: 0
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "IS_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        case "ADD_VALUE":
            return {
                ...state,
                value: action.marks
            };

        default:
            return state;
    }
}
