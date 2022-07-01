import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMongoId } from "../../utils/utilities";
import {
  deleteRequest,
  getRequestHistory,
  cancelRequest,
  rateTutorRequest
} from "../../actions/request";
import Rating from "../requests/Rating";

const UserRequestItem = ({
  item: {
    _id,
    request,
    status,
    subject,
    course,
    grade,
    topic,
    help_time,
    number_sessions,
    last_edit_time,
    tutor_rating
  },
  deleteRequest,
  getRequestHistory,
  cancelRequest,
  rateTutorRequest
}) => {
  const [request_status, setStatus] = useState(status);
  const [rating, setRating] = useState({"rating": tutor_rating});
  console.log(tutor_rating)
  return (
    <div className="profile-exp bg-white p-2 request item user-req">
      <div className="request content">
        <h3 className="text-dark request header">Request: {request}</h3>
        {request_status == "open" ? (
          <span className="request-header-right">
            <Link to={`/edit_request/${_id}`} className="btn btn-primary user request edit">
              Edit
            </Link>
            <button
              className="btn btn-danger user request delete"
              onClick={() => {
                deleteRequest(_id);
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
          <strong>Subject: </strong> {subject ? subject : "N/A"}
        </p>

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

        {/* TODO: add option to review session if status == "closed" */}
        {/* TODO: add option to chat with tutor here too if status == "tutoring" */}
        {request_status === "open" ? (
          <Link
            to={`/request_matched_tutors/${_id}`}
            className="btn btn-dark"
            style={{ float: "right" }}
          >
            {request.selected_tutor === undefined || request.selected_tutor === null
              ? "Check Tutors"
              : "Your Tutor"}
          </Link>
        ) : request_status === "closed" || request_status == "rated" ? (
          <div>
            <span className="request-header-right">
              <button
                className="btn btn-dark"
                onClick={() => {
                  rateTutorRequest(_id, rating);
                }}
              >
                {status === "rated" ? "Change Rating" : "Rate Request" }
              </button>
            </span>
            <span className="request-header-right">
              <Rating rating={rating.rating} setRating={setRating} />
            </span>
          </div>
        ) : (
              <span></span>
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
  rateTutorRequest
})(UserRequestItem);
