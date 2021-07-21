import {POST_USER_REQUEST,
        USER_REQUEST_ERROR,
        GET_USER_REQUEST,
        EDIT_USER_REQUEST,
        DELETE_USER_REQUEST,
        CLEAR_USER_REQUEST,
        LOGOUT,
        ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
    request_history: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POST_USER_REQUEST:
            return {
                ...state,
                request_history: payload.requests ?
                    payload.requests :
                    [payload.new_request],
                loading: false
            };

        case GET_USER_REQUEST:
            return {
                ...state,
                request_history: payload.length === 0 ? [] : payload[0].requests,
                loading: false
            }

        case EDIT_USER_REQUEST:
            return {
                ...state,
                request_history: state.request_history.map(
                    elem => elem._id === payload.updated_request._id ?
                    payload.updated_request :
                    elem)
            }

        case DELETE_USER_REQUEST:
            return {
                ...state,
                request_history: state.request_history.filter(
                    elem => elem._id !== payload.deleted_request._id)
            }

        case USER_REQUEST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        
        case LOGOUT:
        case ACCOUNT_DELETED:
        case CLEAR_USER_REQUEST:
            
            state = initialState;
            return {
                ...state
            }

        default:
            return state;
    }
}