import {
    GET_WEEK_EVENTS,
    CLEAN_CALENDAR,
    CREATE_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    CALENDAR_ERROR,
    LOGOUT
} from "../actions/types";

const initialState = {
    availability: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_WEEK_EVENTS:
            return {
                ...state,
                availability: payload,
                loading: false
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
        
        case LOGOUT:
            state = initialState;
            return {
                state
            }
  
        default:
            return state;
    }
}
  