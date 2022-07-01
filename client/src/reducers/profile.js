import { CLEAR_PROFILE, 
        GET_PROFILE,
        GET_PEER_PROFILE,
        GET_TUTORS,
        PROFILE_ERROR, 
        UPDATE_PROFILE, 
        ACCOUNT_DELETED,
        LOGOUT
} from '../actions/types';

const initialState = {
    profile: null,
    peer_profile: null,
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
        case GET_TUTORS:
            return {
                ...state,
                profiles: payload
            }
        case GET_PEER_PROFILE:
            return {
                ...state,
                peer_profile: payload,
                loading: false,
            }
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