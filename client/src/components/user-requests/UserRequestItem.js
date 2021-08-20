import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMongoId } from "../../utils/utilities";
import {
  deleteRequest,
  getRequestHistory,
  cancelRequest,
} from "../../actions/request";

const UserRequestItem = ({
  item: {
    _id,
    request,
    status,
    course,
    grade,
    topic,
    help_time,
    number_sessions,
    last_edit_time,
  },
  deleteRequest,
  getRequestHistory,
  cancelRequest,
}) => {
  const [request_status, setStatus] = useState(status);
  return (
    <div className="profile-exp bg-white p-2">
      <div>
        <h3 className="text-dark request-header">Request: {request}</h3>
        {request_status == "open" ? (
          <span className="request-header-right">
            <Link to={`/edit_request/${_id}`} className="btn btn-primary">
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteRequest(_id);
                console.log("GETTING REQUEST HISTORY...");
                getRequestHistory(_id);
              }}
            >
              Delete
            </button>
          </span>
        ) : (
          <i
            className="text-primary"
            style={{ paddingRight: "5px", float: "right" }}
          >
            {request_status == "tutoring"
              ? "INSTRUCTION IN PROGRESS"
              : request_status.toUpperCase()}
          </i>
        )}

        <p>
          <strong>Course: </strong> {course ? course : "N/A"}
        </p>

        <p>
          <strong>Topic: </strong> {topic ? topic : "N/A"}
        </p>

        <p>
          <strong>Number of sessions: </strong>{" "}
          {number_sessions ? number_sessions : "N/A"}
        </p>

        <p>
          <strong>Last edit: </strong>{" "}
          {new Date(last_edit_time).toLocaleString()}
        </p>
        {/* TODO: add option to review session if status == "closed" */}
        {/* TODO: add option to chat with tutor here too if status == "tutoring" */}
        {request_status == "open" ? (
          <Link
            to={`/request_matched_tutors/${_id}`}
            className="btn btn-dark"
            style={{ float: "right" }}
          >
            {request.selected_tutor == undefined
              ? "Check Tutors"
              : "Your Tutor"}
          </Link>
        ) : (
          <span className="request-header-right">
            {request_status == "tutoring" ? (
              <button
                className="btn btn-danger"
                onClick={() => {
                  cancelRequest(_id, setStatus);
                }}
              >
                Cancel Session(s)
              </button>
            ) : (
              <span></span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

UserRequestItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default connect(null, {
  deleteRequest,
  getRequestHistory,
  cancelRequest,
})(UserRequestItem);
