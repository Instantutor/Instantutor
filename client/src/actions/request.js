import axios from 'axios';
import { setAlert } from './alert';

import {
    POST_USER_REQUEST,
    USER_REQUEST_ERROR,
    GET_USER_REQUEST,
    PEER_REQUEST_ERROR,
    CHECK_NEW_PEER_REQUEST
    
} from './types';

export const createRequest = requestData => async(dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/request', requestData, config);  

        dispatch({
            type: POST_USER_REQUEST,
            payload: res.data
        });

        dispatch((setAlert("Request Posted", "success")));

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        const limit_exceed = err.response.data.error;
        
        if (limit_exceed != null){
            dispatch({
                type: USER_REQUEST_ERROR,
                payload: limit_exceed
            });
            dispatch(setAlert(limit_exceed, 'danger'))
        }

    }
};


export const getRequestHistory = userId => async(dispatch) => {
    try {
        const res = await axios.get(`/api/request/${userId}`);
        //console.log(res.data);
        dispatch({
            type: GET_USER_REQUEST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: USER_REQUEST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Check if the user received new peer requests
export const checkNewPeerRequest = () => async(dispatch) => {
    try {
        //const res = await axios.get(`/api/request/${userId}`);
        //console.log(res.data);

        // Hardcode data for test. Need to be updated!!!
        const res = 2;

        dispatch({
            type: CHECK_NEW_PEER_REQUEST,
            payload: res.data
        });

        if (res > 0){
            dispatch(setAlert(`You received ${res} new requests!`, 'success'))
        }
    } catch (err) {
        dispatch({
            type: PEER_REQUEST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
