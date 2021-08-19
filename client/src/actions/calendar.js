import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_WEEK_EVENTS,
    CLEAN_CALENDAR,
    CREATE_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    CALENDAR_ERROR
} from "./types";

export const getEvents = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/calendar/front/week");

        dispatch({
            type: GET_WEEK_EVENTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const createEvent = (event) => async (dispatch) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const { _id, ...eventData } = event;

        console.log(eventData);

        //const res = await axios.post("/api/calendar/frontend/event", event, config)

        // dispatch({
        //     type: CREATE_EVENT,
        //     payload: res.data.new_event,
        // });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const editEvent = (event, event_id) => async (dispatch) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        //const res = await axios.put(`/api/calendar/frontend/event/${event_id}`, event, config)

        // dispatch({
        //     type: EDIT_EVENT,
        //     payload: res.data.edited_event,
        // });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const deleteEvent = (event, event_id) => async (dispatch) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        //const res = await axios.delete(`/api/calendar/frontend/event/${event_id}`, event, config)

        // dispatch({
        //     type: DELETE_EVENT,
        //     payload: res.data.deleted_event,
        // });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};