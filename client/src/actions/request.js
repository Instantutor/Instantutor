import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_REQUEST,
    REQUEST_ERROR
} from './types';

/*export const createRequest = (requestData) => {console.log("requestData"); return async (dispatch) => {
    console.log('step 3');
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
}};*/

export const createRequest = async (requestData) => {
    try {
        console.log('success');

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/request', requestData, config);  
    } catch (err) {
        console.log(err);
    }
};