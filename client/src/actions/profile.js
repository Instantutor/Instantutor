import axios from "axios";
import { setAlert } from "./alert";
import { createCalendar, deleteCalendar } from "./calendar";

import {
  GET_PROFILE,
  GET_PEER_PROFILE,
  PROFILE_ERROR,
  ACCOUNT_DELETED,
  UPDATE_PROFILE,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/?user=${userId}&single=t`);
    // console.log(res.data);
    dispatch({
      type: GET_PEER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);
      await createCalendar();

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// add Expertise, edit when id is specified
export const addExpertise =
  (formData, history, id = null) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put(
        id ? `/api/profile/expertise/${id}` : "/api/profile/expertise",
        formData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(id ? "Expertise Updated" : "Expertise Added", "success")
      );
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete expertise
export const deleteExpertise = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to delete this expertise? \n This cannot undo!"
    )
  ) {
    try {
      const res = await axios.delete(`/api/profile/expertise/${id}`);
      await deleteCalendar();
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Expertise Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to delete this account permanently? \n This cannot undo!"
    )
  ) {
    try {
      const res = await axios.delete(`/api/profile`);

      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your Acount Has Been Deleted!"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
