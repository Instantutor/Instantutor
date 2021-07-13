import {GET_SEARCH,
        SEARCH_ERROR, 
        CLEAR_SEARCH,
        ACCOUNT_DELETED,
        LOGOUT,
        AUTO_SUGGESTION } from '../actions/types';

const initialState = {
    result: [],
    second_result: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case AUTO_SUGGESTION:
            return {
                ...state,
                second_result: payload,
                loading: false
            };
            
        case GET_SEARCH:
            return {
                ...state,
                result: payload,
                loading: false
            };

        case SEARCH_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };

        case LOGOUT:
        case ACCOUNT_DELETED:
        case CLEAR_SEARCH:
            
            state = initialState;
            return {
                ...state
            }

        default:
            return state;
    }
}