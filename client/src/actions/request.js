import axios from "axios";
import { setAlert } from "./alert";
import {
  POST_USER_REQUEST,
  USER_REQUEST_ERROR,
  GET_USER_REQUEST,
  EDIT_USER_REQUEST,
  DELETE_USER_REQUEST,
  PEER_REQUEST_ERROR,
  CHECK_NEW_PEER_REQUEST,
  AUTH_ERROR,
  DISPERSE_REQUESTS,
  DISPERSE_REQUEST_ERROR,
} from "./types";

export const createRequest = (requestData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/request", requestData, config);

    dispatch({
      type: POST_USER_REQUEST,
      payload: res.data,
    });

    dispatch(setAlert("Request Posted", "success"));

    // Redirect to the matched tutor page:
    history.push(`/request_matched_tutors/${res.data.new_request._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    const limit_exceed = err.response.data.error;

    if (limit_exceed != null) {
      dispatch({
        type: USER_REQUEST_ERROR,
        payload: limit_exceed,
      });
      dispatch(setAlert(limit_exceed, "danger"));
    }
  }
};

export const editRequest = (requestData, request_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/request/edit/${request_id}`,
      requestData,
      config
    );

    dispatch({
      type: EDIT_USER_REQUEST,
      payload: res.data,
    });

    dispatch(setAlert("Request Edited", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: USER_REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteRequest = (request_id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to delete this expertise? \n This cannot undo!"
    )
  ) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.delete(
        `/api/request/delete/${request_id}`,
        config
      );

      dispatch({
        type: DELETE_USER_REQUEST,
        payload: res.data,
      });

      dispatch(setAlert("Request Deleted", "success"));
    } catch (err) {
      dispatch({
        type: USER_REQUEST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const getRequestHistory = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/request/${userId}`);
    //console.log(res.data);
    dispatch({
      type: GET_USER_REQUEST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Check if the user received new peer requests
export const checkNewPeerRequest = () => async (dispatch) => {
  try {
    //const res = await axios.get(`/api/request/${userId}`);
    //console.log(res.data);

    // Hardcode data for test. Need to be updated!!!
    var token = localStorage.getItem("token");
    if (!token) {
      dispatch({
        type: AUTH_ERROR,
      });
      throw Error("Unauthorized request.");
    }
    var res = await axios.get("/api/profile/tutor/requests", {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log("All requests for tutor:", res.data);
    dispatch({
      type: CHECK_NEW_PEER_REQUEST,
      payload: res.data,
    });

    if (res > 0) {
      dispatch(setAlert(`You received ${res} new requests!`, "success"));
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: PEER_REQUEST_ERROR,
      payload: { msg: err },
    });
  }
};
export const disperseToTutors =
  (chosen_tutors, request_id) => async (dispatch) => {
    //add to request field in tutors; chosen_tutors should be list of id's
    try {
      var token = localStorage.getItem("token");
      if (!token) {
        dispatch({
          type: AUTH_ERROR,
        });
        throw Error("Unauthorized request.");
      }
      var res = await axios.put(
        "/api/request/disperse",
        { tutor_ids: chosen_tutors, request_id: request_id },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      dispatch({
        type: DISPERSE_REQUESTS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: DISPERSE_REQUEST_ERROR,
        payload: { msg: err },
      });
    }
  };
