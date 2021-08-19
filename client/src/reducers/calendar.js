import {
    CONFIRM_CALENDAR_CREATION,
    CREATE_CALENDAR,
    DELETE_CALENDAR,
    GET_WEEK_EVENTS,
    CLEAN_CALENDAR,
    CREATE_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    CALENDAR_ERROR,
    ACCOUNT_DELETED,
    LOGOUT
} from "../actions/types";

const initialState = {
    availability: [],
    created: false,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CONFIRM_CALENDAR_CREATION:
            return {
                ...state,
                created: true
            }

        case CREATE_CALENDAR:
            return {
                ...state,
                created: true
            }
    
        case GET_WEEK_EVENTS:
            return {
                ...state,
                availability: payload,
                loading: false
            }
        
        case CLEAN_CALENDAR:
            return {
                ...state,
                availability: payload.updated_calendar.availability
            }
        
        case CREATE_EVENT:
            return {
                ...state,
                availability: state.availability.concat(payload)
            }
        
        case EDIT_EVENT:
            return {
                ...state,
                availability: state.availability.concat(payload)
            }

        case DELETE_EVENT:
            return {
                ...state,
                availability: state.availability.filter(elem => elem._id !== payload._id)
            }

        case CALENDAR_ERROR:
            return {
                ...state,
                error: payload
            }
        
        case DELETE_CALENDAR:
        case ACCOUNT_DELETED:
        case LOGOUT:
            state = initialState;
            return {
                state
            }
  
        default:
            return state;
    }
}
  