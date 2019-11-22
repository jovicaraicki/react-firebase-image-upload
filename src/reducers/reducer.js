export default function(state, action) {
    switch(action.type) {
        case 'FETCH_IMAGES':
            return {
                ...state,
                images: action.payload
            };
        case 'SET_LOADED':
            return {
                ...state,
                loaded: action.payload
            };
        case 'COUNT_IMAGES':
            return {
                ...state,
                count: action.payload
            }
        case 'SET_FILES':
            return {
                ...state,
                files: action.payload
            }
        default:
            return state;
    }
}