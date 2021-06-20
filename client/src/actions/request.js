import axios from 'axios';
import { setAlert } from './alert';

import {
    POST_REQUEST,
    REQUEST_ERROR
} from './types';

export const createRequest = requestData => async(dispatch) => {
    try {
        console.log('success');

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/request', requestData, config);  

        dispatch({
            type: POST_REQUEST,
            payload: res.data
        });

        dispatch((setAlert("Request Posted", "success")));

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REQUEST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};