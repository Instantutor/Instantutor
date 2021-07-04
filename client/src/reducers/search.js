import {GET_SEARCH,SEARCH_ERROR, SEARCH_CLEAR, AUTO_SUGGESTION } from '../actions/types';

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

        case SEARCH_CLEAR:
            return {
                ...state,
                result: [],
                loading: false
            };

        default:
            return state;
    }
}