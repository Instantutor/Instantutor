import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_REQUEST,
    REQUEST_ERROR
} from './types';

export const createRequest = (requestData) => async (dispatch) => {
    try {
        console.log("Create Request")
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/request', requestData, config);
        
        dispatch({
            type: GET_REQUEST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: REQUEST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};