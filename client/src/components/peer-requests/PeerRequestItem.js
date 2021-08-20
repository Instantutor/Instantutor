import React, { Fragment, useState } from "react";
//import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateTutorResponse,
  cancelRequest,
  closeRequest,
} from "../../actions/request";

const PeerRequestItem = ({
  user,
  item: {
    _id,
    request,
    course,
    grade,
    topic,
    help_time,
    number_sessions,
    last_edit_time,
    state,
    status,
    selected_tutor,
  },
  updateTutorResponse,
  cancelRequest,
  closeRequest,
}) => {
  const tutor_id = user._id;
  const [currentStatus, setCurrentStatus] = useState(status);
  return (
    <div className="profile-exp bg-white p-2">
      <div>
        <i
          className="text-primary"
          style={{ paddingRight: "5px", float: "right" }}
        >
          {currentStatus == "tutoring" && selected_tutor == tutor_id
            ? "INSTRUCTION IN PROGRESS"
            : currentStatus == "canceled" || currentStatus == "closed"
            ? currentStatus.toUpperCase()
            : ""}
        </i>

        <h3 className="text-dark"> Request: {request}</h3>

        <p>
          <strong>Course: </strong> {course}
        </p>

        <p>
          <strong>Topic: </strong> {topic}
        </p>

        <p>
          <strong>Number of sessions: </strong> {number_sessions}
        </p>

        <p>
          <strong>Last edit: </strong>{" "}
          {new Date(last_edit_time).toLocaleString()}
        </p>

        {state === "CHECKING" ? (
          <div>
            <button
              onClick={function () {
                updateTutorResponse("ACCEPT", _id);
              }}
              className="btn btn-success"
            >
              Accept
            </button>

            <button
              onClick={function () {
                updateTutorResponse("DENY", _id);
              }}
              className="btn btn-danger"
            >
              Deny
            </button>

            <button
              //onClick = {()}
              className="btn btn"
            >
              {" "}
              Chat with the poster
            </button>
          </div>
        ) : selected_tutor == tutor_id ? (
          <div>
            <p>You have been selected for this request!</p>{" "}
            <p> You may now begin instruction with this student.</p>
            {currentStatus == "tutoring" ? (
              <div>
                <span className="request-header-right">
                  <button
                    className="btn btn-dark"
                    onClick={async () => {
                      const went_through = await closeRequest(_id);
                      //TODO: Consider not changing state until we know request went through
                      if (went_through) {
                        setCurrentStatus("closed");
                      }
                    }}
                  >
                    Close Request
                  </button>
                </span>
                <span className="request-header-right">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      cancelRequest(_id, setCurrentStatus);
                    }}
                  >
                    Cancel Session(s)
                  </button>
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : selected_tutor != undefined && selected_tutor != tutor_id ? (
          <div>The student has selected another tutor for this request.</div>
        ) : (
          <div>
            Your response to this request is:{" "}
            <i className="text-primary">{state}</i>
          </div>
        )}
      </div>
    </div>
  );
};

PeerRequestItem.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  updateTutorResponse,
  cancelRequest,
  closeRequest,
})(PeerRequestItem);
