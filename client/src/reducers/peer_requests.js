import { CHECK_NEW_PEER_REQUEST, PEER_REQUEST_ERROR } from "../actions/types";

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
        peer_requests: payload.length === 0 ? [] : payload.matching_requests,
        loading: false,
      };

    case PEER_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
