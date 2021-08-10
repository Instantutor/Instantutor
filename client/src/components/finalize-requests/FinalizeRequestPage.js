import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getRequestHistory, disperseToTutorFinal } from "../../actions/request";
import AcceptedTutorItem from "./AcceptedTutorItem";

const UserRequestAcceptedTutor = ({
  user,
  match,
  requests: { request_history, loading },
  getRequestHistory,
  disperseToTutorFinal,
}) => {
  let request_id = match.params.id;
  const [tutors, setTutorsData] = useState(null);
  const [requestId, setRequestId] = useState(null);
  useEffect(async () => {
    (await user) && getRequestHistory(user._id);
  }, [getRequestHistory, user]);

  useEffect(() => {
    if (request_id) {
      if (request_history && !loading) {
        const request_index = request_history
          .map((item) => item._id)
          .indexOf(request_id);
        //only get tutors for this request with "ACCEPT" state
        var acceptedTutors = [];
        const potentialTutors = request_history[request_index].potential_tutors;
        for (var i in potentialTutors) {
          const potential_tutor = potentialTutors[i];
          if (potential_tutor.state == "ACCEPT") {
            acceptedTutors.push(potential_tutor);
          }
        }
        setTutorsData(acceptedTutors);
        setRequestId(request_history[request_index]._id);
      }
    }
  }, [loading, request_history]);
  if (tutors == null) {
    return (
      <Fragment>
        <Spinner />
        <button
          onClick={() => window.history.back(-1)}
          className="btn btn-dark"
        >
          Go Back
        </button>
      </Fragment>
    );
  } else if (tutors.length < 1) {
    return (
      <Fragment>
        <div>
          <h1 className="large text-primary">Oops!</h1>
          <h1 className="text-primary">
            It looks like no tutors have accepted your request.
          </h1>
        </div>
        <button
          onClick={() => window.history.back(-1)}
          className="btn btn-dark"
        >
          Go Back
        </button>
      </Fragment>
    );
  } else {
    const tutorRefs = [];
    for (var i in tutors) {
      var ref = React.createRef();
      tutorRefs.push(ref);
    }
    var i = 0;
    //set up references to components
    var tutorsComponent = [];
    tutors.forEach((tutor) => {
      const tutorRef = tutorRefs[i];
      const component = (
        <AcceptedTutorItem ref={tutorRef} key={tutor._id} item={tutor} />
      );
      tutorsComponent.push(component);
      i++;
    });

    return (
      <Fragment>
        <div className="profiles">
          <h1 className="large text-primary">Responses</h1>
          <h2
            classname="large text-primary"
            style={{ "padding-bottom": "10px" }}
          >
            The following tutors have accepted your request.
          </h2>
          {tutorsComponent}
        </div>
        <button
          onClick={() => window.history.back(-1)}
          className="btn btn-dark"
        >
          Go Back
        </button>
        <Link to="/dashboard" className="btn btn-light">
          Back To Dashboard
        </Link>
        <Link
          onClick={() => {
            var tutor_ids = [];
            for (var i in tutorRefs) {
              if (tutorRefs[i].current.isConfirmed()) {
                tutor_ids.push(tutorRefs[i].current.props.item._id);
              }
            }
            disperseToTutorFinal(tutor_ids, requestId);
          }}
          className="btn btn-primary"
          style={{ float: "right" }}
        >
          Finalize Selection
        </Link>
      </Fragment>
    );
  }
};

UserRequestAcceptedTutor.propTypes = {
  getRequestHistory: PropTypes.func.isRequired,
  disperseToTutorFinal: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  requests: state.user_requests,
});

export default connect(mapStateToProps, {
  getRequestHistory,
  disperseToTutorFinal,
})(UserRequestAcceptedTutor);
