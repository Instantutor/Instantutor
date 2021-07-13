import React, { Fragment } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PeerRequestItem =({
    item: {
        request,
        course,
        grade,
        topic,
        help_time,
        number_sessions,
        post_time
    }
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
                <strong>Posted on: </strong> {new Date(post_time).toLocaleString()}
                </p>



                <button 
                    // The onClick operations are needed to be further implemented!
                    //onClick = {()} 
                    className = 'btn btn-success'>Accept
                </button>

                <button 
                    //onClick = {()} 
                    className = 'btn btn-danger'>Deny
                </button>

                <button 
                    //onClick = {()} 
                    className = 'btn btn'> Chat with the poster
                </button>

            </div>
        </div>
    )
}

PeerRequestItem.propTypes = {
    item: PropTypes.object.isRequired
};
  
export default PeerRequestItem;