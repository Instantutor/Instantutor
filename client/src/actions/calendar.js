import axios from "axios";
import { setAlert } from "./alert";
import {
    CONFIRM_CALENDAR_CREATION,
    CREATE_CALENDAR,
    DELETE_CALENDAR,
    GET_WEEK_EVENTS,
    CLEAN_CALENDAR,
    CREATE_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    CALENDAR_ERROR
} from "./types";

export const confirmCalendar = () => async (dispatch) => {
    try {
        await axios.get("/api/calendar/frontend");

        dispatch ({
            type: CONFIRM_CALENDAR_CREATION
        })
    } catch(err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const createCalendar = () => async (dispatch) => {
    try {
        const res = await axios.post("/api/calendar/frontend");

        dispatch({
            type: CREATE_CALENDAR
        });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const deleteCalendar = () => async (dispatch) => {
    try {
        const res = await axios.delete("/api/calendar/frontend");

        dispatch({
            type: DELETE_CALENDAR
        });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const getEvents = (week_start) => async (dispatch) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const res = await axios.post("/api/calendar/frontend/week",
            {"week_start": week_start},
            config
        );

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

export const cleanCalendar = () => async (dispatch) => {
    try {
        const res = await axios.patch("/api/calendar/frontend/clean");

        dispatch({
            type: CLEAN_CALENDAR,
            payload: res.data,
        });
    } catch(err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
}

export const createEvent = (event) => async (dispatch) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const res = await axios.post("/api/calendar/frontend/event", event, config);

        dispatch({
             type: CREATE_EVENT,
             payload: res.data.new_event,
        });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const editEvent = (event) => async (dispatch) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const res = await axios.put("/api/calendar/frontend/event", event, config)

        dispatch({
            type: EDIT_EVENT,
            payload: res.data.edited_event,
        });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const deleteEvent = (event_id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/calendar/frontend/event/${event_id}`);

        dispatch({
            type: DELETE_EVENT,
            payload: res.data.deleted_event,
        });
    } catch (err) {
        dispatch({
            type: CALENDAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};