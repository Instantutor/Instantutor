import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { getRequestHistory } from "../../actions/request";

import { checkNewPeerRequest } from "../../actions/request";

import DashboardActions from "./DashboardActions";
import Spinner from "../layout/Spinner";

import Expertise from "./Expertise";
import UserRequest from "./UserRequest";
//import { render } from 'react-dom';

const Dashboard = ({
  getCurrentProfile,
  getRequestHistory,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  req_history = [],
  checkNewPeerRequest,
}) => {
  useEffect(() => {
    getCurrentProfile();
    checkNewPeerRequest();
  }, []);

  useEffect(() => {
    user && getRequestHistory(user._id);
  }, [user]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
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
            {user && user.name}
          </p>

          <DashboardActions role={profile.role} />

          {profile.role !== "Student" ? (
            <Expertise expertise={profile.expertise} />
          ) : (
            <Fragment />
          )}

          <UserRequest user_request={req_history} />

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
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  req_history: state.user_requests.request_history,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getRequestHistory,
  checkNewPeerRequest,
})(Dashboard);
