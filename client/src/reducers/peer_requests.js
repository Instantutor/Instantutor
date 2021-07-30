import {
  CHECK_NEW_PEER_REQUEST,
  PEER_REQUEST_ERROR,
  DISPERSE_REQUESTS,
  DISPERSE_REQUEST_ERROR,
} from "../actions/types";

const initialState = {
  peer_requests: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHECK_NEW_PEER_REQUEST:
      return {
        ...state,
        peer_requests: payload,
        loading: false,
      };

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

    default:
      return state;
  }
}
