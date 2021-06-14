import axios from 'axios'
import React, { Fragment, useEffect } from 'react';
//import { setAlert } from './alert';

import {
    GET_SEARCH,
    SEARCH_ERROR,
} from './types';


export const obtainResults = searchData => async(dispatch) => {
    try {
        console.log('Success');

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.get('/api/profile/search', { params: searchData }, config);
        
        
        dispatch({
            type: GET_SEARCH,
            payload: res.data.map((result) => result.user)
        });

        //console.log(res.data.map((result) => result.user));
        
    } catch (err) {
        console.log(err);
        
        dispatch({
            type: SEARCH_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        
    }
    return;
};