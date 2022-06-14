import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { getRequestHistory } from "../../actions/request";

import { checkNewPeerRequest, getConfirmedTutors } from "../../actions/request";

import DashboardActions from "./DashboardActions";
import Spinner from "../layout/Spinner";

import Expertise from "./Expertise";
import UserRequest from "./UserRequest";
//import { render } from 'react-dom';

const Dashboard = ({
  getCurrentProfile,
  getRequestHistory,
  deleteAccount,
  checkNewPeerRequest,
  getConfirmedTutors,

  auth: { user },
  profile: { profile, loading },
  user_requests,
  peer_requests,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    user && getRequestHistory(user._id);
    if (user_requests && user_requests.request_history.length > 0) {
      getConfirmedTutors(
        user_requests.request_history.map((request) => request._id)
      );
    }
  }, [user, user_requests.loading]);

  // Only for non-student-user: check their peered requests
  useEffect(() => {
    user &&
      profile &&
      profile.role !== "Student" &&
      checkNewPeerRequest(user._id);
  }, [user, profile, peer_requests.loading]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile != null ? (
        <Fragment>
          <h1 className="large text-primary"> Personal page </h1>
          <p className="lead">
            <i className="fas fa-user "></i> Welcome,
            <Fragment>
              {profile.role === "Both" ? (
                <i> Tutor & Student </i>
              ) : (
                <i> {" " + profile.role} </i>
              )}
            </Fragment>
            {user && user.name + ". "}
            <Fragment>
              {peer_requests && peer_requests.num_new_request > 0 && (
                <i className="text-primary">
                  {" "}
                  {"You got " +
                    peer_requests.num_new_request +
                    " new requests from others."}
                </i>
              )}
            </Fragment>
          </p>

          {/* <DashboardActions role={profile.role} /> */}

          {profile.role !== "Student" ? (
            <Expertise expertise={profile.expertise} />
          ) : (
            <Fragment />
          )}

          {user_requests.loading ? (
            <Spinner />
          ) : (
            <UserRequest user_request={user_requests.request_history} />
          )}

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p> You have not yet setup a profile, please add some info</p>
          <Link to="/create_profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getRequestHistory: PropTypes.func.isRequired,
  checkNewPeerRequest: PropTypes.func.isRequired,
  getConfirmedTutors: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  user_requests: PropTypes.object.isRequired,
  peer_requests: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  user_requests: state.user_requests,
  peer_requests: state.peer_requests,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getRequestHistory,
  checkNewPeerRequest,
  getConfirmedTutors,
})(Dashboard);
