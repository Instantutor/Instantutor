import axios from 'axios'
import { setAlert } from './alert';

//import React, { Fragment, useEffect } from 'react';

import {
    GET_SEARCH,
    SEARCH_CLEAR,
    SEARCH_ERROR,
    retrieveNames
} from './types';


export const obtainResults = searchData => async(dispatch) => {
    try {
        dispatch((setAlert("Searching...", "", 1000)));

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.get('/api/profile/search', { params: searchData }, config);
        
        dispatch({
            type: GET_SEARCH,
            payload: res.data
        });

        dispatch((setAlert("Search completed", "success")));
          
    } catch (err) {
        console.log(err);
        
        dispatch({
            type: SEARCH_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        dispatch((setAlert("ERROR", "danger")));
    }
};

export const getNames = () => async(dispatch) =>
{
    try {
        const res = await axios.get('/api/profile/names');
        // console.log("hello")
        dispatch({
            type: retrieveNames,
            payload: res.data
        });
        console.log(res.data);
    } catch (err) {
        dispatch({
            type: retrieveNames,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }

}