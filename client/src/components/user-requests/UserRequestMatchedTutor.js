import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getRequestHistory, disperseToTutors } from "../../actions/request";
import MatchedTutorItem from "./MatchedTutorItem";

const UserRequestMatchedTutor = ({
  user,
  match,
  requests: { request_history, loading },
  getRequestHistory,
  disperseToTutors,
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
        setTutorsData(request_history[request_index].potential_tutors);
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
    <Fragment>
      <div>
        <h1 className="large text-primary">Oops!</h1>
        <h1 className="text-primary">No matched tutor...</h1>
      </div>
      ;
      <button onClick={() => window.history.back(-1)} className="btn btn-dark">
        Go Back
      </button>
      ;
    </Fragment>;
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
        <MatchedTutorItem ref={tutorRef} key={tutor._id} item={tutor} />
      );
      tutorsComponent.push(component);
      i++;
    });

    return (
      <Fragment>
        <div className="profiles">
          <h1 className="large text-primary">Check your tutors!</h1>
          {tutorsComponent}
        </div>
        <button
          onClick={() => window.history.back(-1)}
          className="btn btn-dark"
        >
          Go Back
        </button>
        <button
          onClick={() => {
            var tutor_ids = [];
            for (var i in tutorRefs) {
              if (tutorRefs[i].current.isConfirmed()) {
                tutor_ids.push(tutorRefs[i].current.props.item._id);
              }
            }
            console.log("Tutors and request Id:", tutors, requestId);
            disperseToTutors(tutor_ids, requestId);
            window.history.back(-1);
          }}
          className="btn btn-primary"
          style={{ float: "right" }}
        >
          Submit
        </button>
      </Fragment>
    );
  }
};

UserRequestMatchedTutor.propTypes = {
  getRequestHistory: PropTypes.func.isRequired,
  disperseToTutors: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  requests: state.user_requests,
});

export default connect(mapStateToProps, {
  getRequestHistory,
  disperseToTutors,
})(UserRequestMatchedTutor);
