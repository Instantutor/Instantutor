import React, { Fragment } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {updateTutorResponse} from "../../actions/request";

const PeerRequestItem =({
    item: {
        _id,
        request,
        course,
        grade,
        topic,
        help_time,
        number_sessions,
        last_edit_time,
        state
    },
    updateTutorResponse,
}) => {
    return (
        <div className="profile-exp bg-white p-2">
              <div>
                <h3 className="text-dark"> Request: {request}</h3>

                <p>
                <strong>Course: </strong> {course}
                </p>

                <p>
                <strong>Topic: </strong> {topic}
                </p>

                <p>
                <strong>Number of sessions: </strong> {number_sessions}
                </p>

                <p>
                <strong>Last edit: </strong> {new Date(last_edit_time).toLocaleString()}
                </p>

                {state === "CHECKING" ? (
                    <div>
                        <button 
                            onClick = {function(){updateTutorResponse("ACCEPT", _id)}}
                            className = 'btn btn-success'>Accept
                        </button>

                        <button 
                            onClick = {function(){updateTutorResponse("DENY", _id)}}
                            className = 'btn btn-danger'>Deny
                        </button>

                        <button 
                            //onClick = {()} 
                            className = 'btn btn'> Chat with the poster
                        </button>
                    </div>
                ) : (
                    <div>
                        Your response to this request is: <i className="text-primary">{state}</i>
                    </div>
                )}


            </div>
        </div>
    )
}

PeerRequestItem.propTypes = {
    item: PropTypes.object.isRequired
};
  
export default connect(null, { updateTutorResponse })(
    PeerRequestItem
);
  