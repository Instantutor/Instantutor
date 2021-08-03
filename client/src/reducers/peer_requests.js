import {
  CHECK_NEW_PEER_REQUEST,
  PEER_REQUEST_ERROR,
  DISPERSE_REQUESTS,
  DISPERSE_REQUEST_ERROR,
  UPDATE_PROFILE,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATE_CHECK_TIME,
} from "../actions/types";

const initialState = {
  peer_requests: [],
  num_new_request: 0,
  last_check_time: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHECK_NEW_PEER_REQUEST:
      return {
        ...state,
        peer_requests: payload.peer_requests,
        num_new_request : payload.new_request,
        last_check_time : payload.last_checked,
        loading: false,
      };

    case UPDATE_CHECK_TIME:
      return{
        ...state,
        last_check_time : payload.last_check_time
      }
      
    case PEER_REQUEST_ERROR:
    case DISPERSE_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DISPERSE_REQUESTS:
      return {
        ...state,
        chosen_tutors: payload.tutors,
        request: payload.request,
      };
    
    case UPDATE_PROFILE:
    case LOGOUT:
    case ACCOUNT_DELETED:
      state = initialState;
      return {
        ...state,
      };

    default:
      return state;
  }
}
