import {POST_REQUEST,
        REQUEST_ERROR,
        GET_REQUEST
} from '../actions/types';

const initialState = {
    request: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POST_REQUEST:
            return {
                ...state,
                result: payload,
                loading: false
            };
        case GET_REQUEST:
            return {
                ... state,
                request_history: payload,
                loading: false
            }

        case REQUEST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };

        default:
            return state;
    }
}