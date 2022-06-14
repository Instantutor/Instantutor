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
    user : {
      name
    },
    request,
    subject,
    course,
    grade,
    topic,
    help_time,
    number_sessions,
    last_edit_time,
    state,
    status,
    selected_tutor
  },
  updateTutorResponse,
  cancelRequest,
  closeRequest,
}) => {
  const tutor_id = user._id;
  const [currentStatus, setCurrentStatus] = useState(status);
  console.log(status);
  console.log(state);
  return (
    <div className="profile-exp bg-white p-2 request item peer-req">
      <div className="request content">
        {/* <i
          className="text-primary"
          style={{ paddingRight: "5px", float: "right" }}
        >
          {currentStatus == "tutoring" && selected_tutor == tutor_id
            ? "INSTRUCTION IN PROGRESS"
            : currentStatus == "canceled" || currentStatus == "closed"
            ? currentStatus.toUpperCase()
            : ""}
        </i> */}

        <h3 className="text-dark request header"> Request: {request ? request : "N/A"}</h3>

        <p className="request">
          <strong>Name: </strong> {name}
        </p>

        <p className="request">
          <strong>Subject: </strong> {subject ? subject : "N/A"}
        </p>

        <p className="request">
          <strong>Course: </strong> {course ? course : "N/A"}
        </p>

        <p className="request">
          <strong>Topic: </strong> {topic ? topic : "N/A"}
        </p>

        <p className="request">
          <strong>Number of sessions: </strong> {number_sessions ? number_sessions : "N/A"}
        </p>
        
        <hr className="request"></hr>

        {state === "CHECKING" ? (
          <div class="request btns">
            <button
              onClick={function () {
                updateTutorResponse("ACCEPT", _id);
              }}
              className="btn btn-success request accept"
            >
              {/* <img src={require('../../assets/Instantutor Icons/check-solid.svg')} className="svg"/> */}
              Accept
            </button>

            <button
              onClick={function () {
                updateTutorResponse("DENY", _id);
              }}
              className="btn btn-danger request deny"
            >
              Deny
            </button>

            <button
              //onClick = {()}
              className="btn request chat"
            >
              {" "}
              Chat
            </button>
          </div>
        ) : selected_tutor == tutor_id ? (
          <div>
            {/* <p>You have been selected for this request!</p>{" "}
            <p> You may now begin instruction with this student.</p> */}
            Status:
            {currentStatus == "tutoring" ? ( // if tutoring
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
                    title="Close Request"
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
                    title="Cancel Session(s)"
                  >
                    Cancel Session(s)
                  </button>
                </span>
              </div>
            ) : ( // if not tutoring
              <div></div>
            )}
          </div>
        ) : selected_tutor != undefined && selected_tutor != tutor_id ? (
          <div>The student has selected another tutor for this request.</div>
        ) : (
          <div>
            Status:
            <i className="text-primary">{" " + stateToString(state)}</i>
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

const stateToString = (state) => {
  if (state == 'DENY')
    return "Denied";
  else if (state == 'ACCEPT')
    return "Accepted";
  else
    return "skiddledibap"; // error
}

export default connect(mapStateToProps, {
  updateTutorResponse,
  cancelRequest,
  closeRequest,
})(PeerRequestItem);
