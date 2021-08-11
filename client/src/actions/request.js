import axios from "axios";
import { setAlert } from "./alert";
import {
  POST_USER_REQUEST,
  USER_REQUEST_ERROR,
  GET_USER_REQUEST,
  EDIT_USER_REQUEST,
  DELETE_USER_REQUEST,
  GET_CONFIRMED_TUTORS_ERROR,
  GET_CONFIRMED_TUTORS,
  PEER_REQUEST_ERROR,
  CHECK_NEW_PEER_REQUEST,
  UPDATE_CHECK_TIME,
  AUTH_ERROR,
  DISPERSE_REQUESTS,
  DISPERSE_FINAL_REQUEST,
  DISPERSE_REQUEST_ERROR,
  REQUEST_RESPONSE,
  CLOSE_REQUEST,
  CLOSE_REQUEST_ERROR,
  CANCEL_REQUEST,
  CANCEL_REQUEST_ERROR,
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
export const checkNewPeerRequest = (userId) => async (dispatch) => {
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
    var res = await axios.get(`/api/request/received/${userId}`);
    dispatch({
      type: CHECK_NEW_PEER_REQUEST,
      payload: res.data,
    });

    /*
    if (res.data.new_request > 0){
      dispatch(setAlert(`You received ${res.data.new_request} new requests!`, "success"));
    }
    */
  } catch (err) {
    console.error(err);
    dispatch({
      type: PEER_REQUEST_ERROR,
      payload: { msg: err },
    });
  }
};

export const updateCheckTime = () => async (dispatch) => {
  try {
    const res = await axios.put("/api/request/checked");
    console.log(res.data);
    dispatch({
      type: UPDATE_CHECK_TIME,
      payload: res.data,
    });
    dispatch(setAlert("Checked all new requests...", "success"));
  } catch (err) {
    dispatch({
      type: PEER_REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateTutorResponse = (response, id) => async (dispatch) => {
  if (window.confirm(`You want to ${response} this request, are you sure?`)) {
    try {
      const res = await axios.put(`/api/request/tutor/response`, {
        response: response,
        _id: id,
      });
      //console.log(res.data);

      dispatch({
        type: REQUEST_RESPONSE,
        payload: res.data,
      });

      dispatch(setAlert(`${response} the request...`, "success"));
    } catch (err) {
      dispatch({
        type: PEER_REQUEST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const disperseToTutors =
  (tutor_choices, request_id) => async (dispatch) => {
    //add to request field in tutors; chosen_tutors should be list of id's
    try {
      var token = localStorage.getItem("token");
      if (!token) {
        dispatch({
          type: AUTH_ERROR,
        });
        throw Error("Unauthorized request.");
      }
      var res = await axios.post(
        "/api/request/disperse",
        { tutor_ids: tutor_choices, request_id: request_id },
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

      dispatch(
        setAlert(
          `Your request has been dispatched to selected tutors!`,
          "success"
        )
      );
    } catch (err) {
      console.error(err);
      dispatch({
        type: DISPERSE_REQUEST_ERROR,
        payload: { msg: err },
      });
    }
  };
export const disperseToTutorFinal =
  (chosen_tutor, request_id) => async (dispatch) => {
    //add to request field in tutors; chosen_tutors should be list of id's
    try {
      var token = localStorage.getItem("token");
      if (!token) {
        dispatch({
          type: AUTH_ERROR,
        });
        throw Error("Unauthorized request.");
      }
      if (chosen_tutor == null) {
        dispatch(
          setAlert(
            `You must select a tutor before finalizing your request.`,
            "danger"
          )
        );
        return;
      }
      var res = await axios.post(
        "/api/request/disperseFinal",
        { tutor_id: chosen_tutor, request_id: request_id },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      dispatch({
        type: DISPERSE_FINAL_REQUEST,
        payload: res.data,
      });

      dispatch(
        setAlert(`Your request has been set for that tutor!`, "success")
      );
    } catch (err) {
      console.error(err);
      dispatch({
        type: DISPERSE_REQUEST_ERROR,
        payload: { msg: err },
      });
    }
  };

export const getConfirmedTutors = (request_ids) => async (dispatch) => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/request/tutors/confirmed",
      headers: { "Content-Type": "application/json" },
      data: {
        request_ids: request_ids, // This is the body part
      },
    });
    //get tutors that have received confirmation for each request
    //console.log(res.data);
    dispatch({
      type: GET_CONFIRMED_TUTORS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CONFIRMED_TUTORS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const cancelRequest = (request_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/request/cancel/${request_id}`);
    //get tutors that have received confirmation for each request
    //console.log(res.data);
    dispatch({
      type: CANCEL_REQUEST,
      payload: res.data,
    });
    dispatch(
      setAlert(
        `You have canceled session(s) for that request successfully.`,
        "success"
      )
    );
    return true;
  } catch (err) {
    dispatch({
      type: CANCEL_REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    return false;
  }
};
export const closeRequest = (request_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/request/close/${request_id}`);
    //get tutors that have received confirmation for each request
    //console.log(res.data);
    dispatch({
      type: CLOSE_REQUEST,
      payload: res.data,
    });
    dispatch(setAlert(`You have successfully closed that request.`, "success"));
    return true;
  } catch (err) {
    dispatch({
      type: CLOSE_REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    return false;
  }
};
