import {
  POST_USER_REQUEST,
  USER_REQUEST_ERROR,
  GET_USER_REQUEST,
  EDIT_USER_REQUEST,
  DELETE_USER_REQUEST,
  CLEAR_USER_REQUEST,
  GET_CONFIRMED_TUTORS,
  GET_CONFIRMED_TUTORS_ERROR,
  DISPERSE_FINAL_REQUEST,
  DISPERSE_REQUEST_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  request_history: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_REQUEST:
      return {
        ...state,
        request_history: payload,
        loading: false,
      };
    case GET_CONFIRMED_TUTORS:
      return {
        ...state,
        confirmed_tutors: payload,
        loading: false,
      };

    case USER_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DISPERSE_FINAL_REQUEST:
      return {
        ...state,
        chosen_tutor: payload.tutor,
        request: payload.request,
        loading: true,
      };

    case DISPERSE_REQUEST_ERROR:
    case GET_CONFIRMED_TUTORS_ERROR:
    case EDIT_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case LOGOUT:
    case ACCOUNT_DELETED:
    case CLEAR_USER_REQUEST:
      state = initialState;
      return {
        ...state,
      };

    default:
      return state;
  }
}
