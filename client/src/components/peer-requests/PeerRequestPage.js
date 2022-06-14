import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PeerRequestItem from "./PeerRequestItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkNewPeerRequest, updateCheckTime } from '../../actions/request';


const PeerRequestPage = ({ 
  user, 
  peer_requests, 
  num_new_request,
  last_check_time,
  loading = true, 
  checkNewPeerRequest,
  updateCheckTime
}) => {

  useEffect(async () => {
    await user && checkNewPeerRequest(user._id);
  }, 
    [checkNewPeerRequest, user, loading, num_new_request, last_check_time]
  );

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : peer_requests === null || peer_requests === undefined || peer_requests.length < 1 ? (
        <div>
            <h2 className="large text-primary">Oops! No Requests for you, for now...</h2>
        </div>
      ) : (
        <div>
          <h1 className="large text-primary">Request for you!</h1>
          <i className="fas fa-clock"></i> Last checked time: 
          <i className="text-primary">{new Date(last_check_time).toLocaleString()}</i> 
          <small> (Click "mark as checked" to make sure you checked all new requests!) </small>
          <div className="request">
            {peer_requests.slice(0, num_new_request).map((peer_request) => (
              <PeerRequestItem key={peer_request.id} item={peer_request} />
            ))}
            {peer_requests.slice(num_new_request).map((peer_request) => (
              <PeerRequestItem key={peer_request.id} item={peer_request} />
            ))}
          </div>
        </div>
      )}

    </Fragment>
  );
};

PeerRequestPage.propTypes = {
  checkNewPeerRequest: PropTypes.func.isRequired,
  updateCheckTime: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  num_new_request: PropTypes.number,
  last_check_time: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  peer_requests: state.peer_requests.peer_requests,
  loading: state.peer_requests.loading,
  num_new_request: state.peer_requests.num_new_request,
  last_check_time: state.peer_requests.last_check_time,
});

export default connect(mapStateToProps, {checkNewPeerRequest, updateCheckTime})(PeerRequestPage);
