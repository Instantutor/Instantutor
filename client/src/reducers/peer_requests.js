import {
  CHECK_NEW_PEER_REQUEST,
  PEER_REQUEST_ERROR,
  DISPERSE_REQUESTS,
  DISPERSE_FINAL_REQUEST,
  DISPERSE_REQUEST_ERROR,
  UPDATE_PROFILE,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATE_CHECK_TIME,
  REQUEST_RESPONSE,
  RATE_PEER_REQUEST,
  RATE_USER_REQUEST,
  RATE_REQUEST_ERROR
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
        num_new_request: payload.new_request,
        last_check_time: payload.last_checked,
        loading: false,
      };

    case UPDATE_CHECK_TIME:
      return {
        ...state,
        last_check_time: payload.last_check_time,
      };

    case RATE_REQUEST_ERROR:
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

    case REQUEST_RESPONSE:
      return {
        ...state,
        loading: true,
      };
    
    case RATE_PEER_REQUEST:
      return {
        ...state,
        peer_requests: state.peer_requests.map(request =>
          request._id === payload ? {...request, state: "RATED"} : request )
      };

    case RATE_USER_REQUEST:
      return {
        ...state,
        peer_requests: state.peer_requests.map(request =>
          request._id === payload ? {...request, status: "rated"} : request )
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
