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
  item,
  updateTutorResponse,
  cancelRequest,
  closeRequest,
}) => {
  const tutor_id = user._id;
  const [currentStatus, setCurrentStatus] = useState(item.status);
  return (
    <div className="profile-exp bg-white p-2">
      <div>
        <i
          className="text-primary"
          style={{ paddingRight: "5px", float: "right" }}
        >
          {currentStatus == "tutoring" && item.selected_tutor == tutor_id
            ? "INSTRUCTION IN PROGRESS"
            : currentStatus == "canceled" || currentStatus == "closed"
            ? currentStatus.toUpperCase()
            : ""}
        </i>

        <h3 className="text-dark"> Request: {item.request}</h3>

        <p>
          <strong>Course: </strong> {item.course}
        </p>

        <p>
          <strong>User ID: </strong> {item.user}
        </p>

        <p>
          <strong>Topic: </strong> {item.topic}
        </p>

        <p>
          <strong>Number of sessions: </strong> {item.number_sessions}
        </p>

        <p>
          <strong>Last edit: </strong>{" "}
          {new Date(item.last_edit_time).toLocaleString()}
        </p>

        {item.state === "CHECKING" ? (
          <div>
            <button
              onClick={function () {
                updateTutorResponse("ACCEPT", item._id);
              }}
              className="btn btn-success"
            >
              Accept
            </button>

            <button
              onClick={function () {
                updateTutorResponse("DENY", item._id);
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
        ) : item.selected_tutor == tutor_id ? (
          <div>
            <p>You have been selected for this request!</p>{" "}
            <p> You may now begin instruction with this student.</p>
            {currentStatus == "tutoring" ? (
              <div>
                <span className="request-header-right">
                  <button
                    className="btn btn-dark"
                    onClick={async () => {
                      const went_through = await closeRequest(item._id);
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
                      cancelRequest(item._id, setCurrentStatus);
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
        ) : item.selected_tutor != undefined && item.selected_tutor != tutor_id ? (
          <div>The student has selected another tutor for this request.</div>
        ) : (
          <div>
            Your response to this request is:{" "}
            <i className="text-primary">{item.state}</i>
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
