import { CLEAR_PROFILE, 
        GET_PROFILE, 
        PROFILE_ERROR, 
        UPDATE_PROFILE, 
        ACCOUNT_DELETED,
        LOGOUT
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        
        case LOGOUT:
        case ACCOUNT_DELETED:
        case CLEAR_PROFILE:
            
            return {
                ...state,
                profile: null,
                repos: [],
                loading: true
            };
            
        default:
            return state;
    }
}