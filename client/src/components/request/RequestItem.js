import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequestItem =({
    item: {
        request,
        course,
        grade,
        topic,
        help_time,
        number_sessions
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
                
            </div>
        </div>
    )
}

RequestItem.propTypes = {
    request: PropTypes.object.isRequired
};
  
export default RequestItem;