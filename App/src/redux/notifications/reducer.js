
export const initialState = {
    notif_token:'',
    notif_topic_count:0,
    notif_private_count:0,
    notif_topic:[],
    notif_private:[]
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "NOTIF_TOPIC_UPDATE":
            return {
                ...state,
                notif_topic:action.notif_topic,
                notif_topic_count:action.notif_topic_count,
            };
            case "NOTIF_USER_UPDATE":
            return {
                ...state,
                notif_private:action.notif_private,
                notif_private_count:action.notif_private_count,
            };  
            case "NOTIF_TOKEN_UPDATE":
            return {
                ...state,
                notif_token:action.token
            };    
            
          

        default:
            return state;
    }
}
