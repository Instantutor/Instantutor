import {GET_REQUEST,REQUEST_ERROR } from '../actions/types';

const initialState = {
    search: null,
    match_profiles: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_REQUEST:
            return {
                ...state,
                search: payload,
                loading: false
            };

        case REQUEST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
    }
}