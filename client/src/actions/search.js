import axios from 'axios'
import { setAlert } from './alert';

//import React, { Fragment, useEffect } from 'react';

import {
    GET_SEARCH,
    SEARCH_CLEAR,
    SEARCH_ERROR,
    AUTO_SUGGESTION,
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

// This will call the api which spawns the python script from algos/SearchBar/Trie.py. Dispatches an array of strings

export const autoSuggestion = searchData => async(dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.get('/api/searchbar/suggestedlist', { params: searchData }, config);
        const split_string = res.data.split(",");
        // console.log(split_string);     
        dispatch({
            type: AUTO_SUGGESTION,
            payload: split_string
        }); 
    } catch (err) {
        console.log(err);
        
        dispatch({
            type: SEARCH_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        dispatch((setAlert("ERROR", "danger")));
    }
};