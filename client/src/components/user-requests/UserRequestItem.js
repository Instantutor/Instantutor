import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserRequestItem =({
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
                
            </div>
        </div>
    )
}

RequestItem.propTypes = {
    item: PropTypes.object.isRequired
};
  
export default UserRequestItem;