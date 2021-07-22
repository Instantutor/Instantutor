import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteRequest } from '../../actions/request';

const UserRequestItem =({
    item: {
        _id,
        request,
        course,
        grade,
        topic,
        help_time,
        number_sessions,
        last_edit_time
    },
    deleteRequest
}) => {

    return (
        <div className="profile-exp bg-white p-2">
            <div>
                <h3 className="text-dark request-header">
                    Request: {request}
                </h3>

                <span className="request-header-right">
                    <Link to={`/edit_request/${_id}`} className='btn btn-primary'>
                        Edit
                    </Link>
                    <button className = "btn btn-danger" onClick={() => deleteRequest(_id)}>
                        Delete
                    </button>
                </span>


                <p>
                <strong>Course: </strong> {course ? course : "N/A"}
                </p>

                <p>
                <strong>Topic: </strong> {topic ? topic : "N/A"}
                </p>

                <p>
                <strong>Number of sessions: </strong> {number_sessions ? number_sessions : "N/A"}
                </p>

                <p>
                <strong>Last edit: </strong> {new Date(last_edit_time).toLocaleString()}
                </p>
                
            </div>
        </div>
    )
}

UserRequestItem.propTypes = {
    item: PropTypes.object.isRequired
};
  
export default connect(null, {deleteRequest})(UserRequestItem);