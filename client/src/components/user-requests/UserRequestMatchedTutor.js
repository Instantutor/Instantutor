import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getRequestHistory } from "../../actions/request";
import MatchedTutorItem from "./MatchedTutorItem";

const UserRequestMatchedTutor = ({
  user,
  match,
  requests: { request_history, loading },
  getRequestHistory,
}) => {
  let request_id = match.params.id;
  const [tutors, setTutorsData] = useState(null);
  const [tutorsComponent, setTutorsComponent] = useState(null);
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
    //set up tutors component
    var tutorsComponentUtil = tutors.map((tutor) => (
      <MatchedTutorItem key={tutor._id} item={tutor} />
    ));

    setTutorsComponent(tutorsComponentUtil);

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
            for (var i in tutorsComponent) {
              console.log("Confirmed:", tutorsComponent[i].isConfirmed());
            }
            /*Send those that are confirmed to mongo*/
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
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  requests: state.user_requests,
});

export default connect(mapStateToProps, { getRequestHistory })(
  UserRequestMatchedTutor
);
