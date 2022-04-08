import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getRequestHistory } from "../../actions/request";
import MatchedTutorItem from "./MatchedTutorItem";

const UserRequestMatchedTutor = ({
  user,
  match,
  requests: { request_history, loading, confirmed_tutors },
  getRequestHistory,
}) => {
  let request_id = match.params.id;
  const [final_tutor, setFinalTutor] = useState(null);
  const [tutors, setTutorsData] = useState(null);
  const finalize_callback = () => {
    window.location.reload(false);
  };
  useEffect(async () => {
    (await user) && getRequestHistory(user._id);
  }, [getRequestHistory, user]);

  useEffect(async () => {
    if (request_id) {
      if (request_history && !loading) {
        const request_index = request_history
          .map((item) => item._id)
          .indexOf(request_id);
        setTutorsData(request_history[request_index].potential_tutors);
        if (request_history[request_index].selected_tutor != undefined) {
          setFinalTutor(request_history[request_index].selected_tutor);
        }
      }
      return () => {
        setTutorsData({});
        setFinalTutor({});
      };
    }
  }, [loading, request_history]);
  if (loading) {
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
  } else if (tutors == null || tutors.length < 1) {
    return (
      <Fragment>
        <div>
          <h1 className="large text-primary">Oops!</h1>
          <h1 className="text-primary">No matched tutor...</h1>
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
    var tutorsComponent = [];
    if (final_tutor == null) {
      var tutorRefs = [];
      for (var i in tutors) {
        var ref = React.createRef();
        tutorRefs.push(ref);
      }
      var i = 0;
      //set up references to components
      tutors.forEach((tutor) => {
        const tutorRef = tutorRefs[i];
        var isConfirmed = false;
        //check confirmed tutors for this requests using confirmed_tutors object
        if (
          confirmed_tutors &&
          confirmed_tutors[request_id] &&
          confirmed_tutors[request_id].includes(tutor._id)
        ) {
          isConfirmed = true;
        }
        const component = (
          <MatchedTutorItem
            request_id={request_id}
            ref={tutorRef}
            key={tutor._id}
            item={tutor}
            confirmed={isConfirmed}
            finalize_callback={finalize_callback}
          />
        );
        tutorsComponent.push(component);
        i++;
      });
    } else {
      const final_tutor_index = tutors.findIndex(
        (item) => item._id == final_tutor
      );
      const tutor = tutors[final_tutor_index];
      const component = (
        <MatchedTutorItem
          request_id={request_id}
          key={tutor._id}
          item={tutor}
          confirmed={true}
        />
      );
      tutorsComponent.push(component);
    }
    const selection_finalized = final_tutor != null;
    console.log("SELECTION FINALZIED:", selection_finalized);
    return (
      <Fragment>
        <div className="profiles">
          <h1 className="large text-primary">
            {selection_finalized
              ? "Your Selection for This Request"
              : "Check your tutors!"}
          </h1>
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
})(UserRequestMatchedTutor);
