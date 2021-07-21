import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PeerRequestItem from "./PeerRequestItem";
import { getTutorRequests } from "../../actions/profile";
/*
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
*/
const PeerRequestPage = ({ recived_req = [], loading = false }) => {
  // Hardcoded content for test, will be removed!
  /* TODO: Use localhost:5000/api/profile/tutor/requests path to get all requests
     that have matches to the current tutor. This should be in the getTutorRequests
     function in actions, but a reducer and state management in this file is still
     needed.*/
  recived_req = [
    {
      id: 0,
      availability: ["sunday morning", "monday evening"],
      post_time: "2021-07-12T20:46:29.155Z",
      request: "OS Exam!",
      status: "open",
      course: "CSCI",
      grade: "Undergraduate",
      help_time: "ASAP",
      number_sessions: 10,
      topic: "First OS exam question!",
    },

    {
      id: 1,
      availability: ["sunday evening", "monday morning"],
      post_time: "2021-07-10T20:46:29.155Z",
      request: "I dont know",
      status: "open",
      grade: "Undergraduate",
      help_time: "The month",
      number_sessions: 1000,
      topic: "First OS exam question!",
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : recived_req === null || recived_req.length < 1 ? (
        <div>
          <h1 className="large text-primary">
            Oops! No request for you now...
          </h1>
          <h1 className="text-primary">
            A notification will be sent to you once we find requests for you!
          </h1>
        </div>
      ) : (
        <div className="request">
          <h1 className="large text-primary">Check Request for you!</h1>
          {recived_req.map((peer_request) => (
            <PeerRequestItem key={peer_request.id} item={peer_request} />
          ))}
        </div>
      )}

      <Link to="/dashboard" className="btn btn-light">
        Back To Dashboard
      </Link>
    </Fragment>
  );
};

export default PeerRequestPage;
