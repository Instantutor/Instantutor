import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { disperseToTutors } from "../../actions/request";
import { connect } from "react-redux";


const MatchedTutorItem = ({
  item: {
    name, _id, avatar, bio, state
  },
  req_id,
  disperseToTutors,
}) => {
  return (
    <div className="profile bg-white p-2">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        {bio && (
          <p>
            <i className="far fa-address-card"> {" " + bio} </i>
          </p>
        )}
      </div>

      <Link
        to={`/profile/${_id}`}
        target="_blank"
        className="btn btn-primary"
      >
        <i className="fas fa-user-circle"> </i> View Profile
      </Link>
      
      <Fragment>
        {state === "UNSEND" ? (
          <button
            className="btn-confirm"
            onClick={() => {
              disperseToTutors([_id], req_id)}
            }
          >
            Send request
          </button>
        ) : (
          <div>
            <i> The tutor's state: </i>  
            <i className="text-primary">  {state} </i>
          </div>
        )}
        
        {
          state === "ACCEPT" && (
            <button
              onClick={function () {
                // To be implemented: Should call finalize method and dispatch to a new page for tutor.
              }}
              className="btn btn-success"
            >
              Finalize Tutor
            </button>
          )
        }
      </Fragment>
    </div>
  );
}


MatchedTutorItem.propTypes = {
  tutor: PropTypes.object,
};

export default connect(null, {
  disperseToTutors,
})(MatchedTutorItem);
