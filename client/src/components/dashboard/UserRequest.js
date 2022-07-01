import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRequest } from '../../actions/request';

const UserRequest = ({ user_request, deleteRequest }) => {
    
    const requests = user_request.map((req) => (
        <Fragment key={req._id}>

            {req.status === "open" && 
                <tr>
                    <td>{req.request}</td>
                    <td className="hide-sm">{req.course}</td>
                    <td className="hide-sm">{new Date(req.last_edit_time).toLocaleDateString()}</td>

                    <td>
                        <Link to={`/request_matched_tutors/${req._id}`} className='btn btn-dark'>
                            Check Tutors
                        </Link>
                    </td>

                    <td>
                        <Link to={`/edit_request/${req._id}`} className='btn btn-primary'>
                            Edit
                        </Link>
                    </td>

                    <td>
                        <button 
                            onClick = {()=>deleteRequest(req._id)} 
                            className = 'btn btn-danger'>Delete
                        </button>
                    </td>
                </tr>

            }
            
        </Fragment>
    ));

    return (
        <Fragment>

            <h2 className="my-2">Active Requests</h2>

            {JSON.stringify(user_request) !== '[]' ? (
                <Fragment>
                    <table className="table">
                    <thead>
                        <tr>
                            <th>Request</th>
                            <th className="hide-sm">Course</th>
                            <th className="hide-sm">Last Edit</th>
                            <th>Operations</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>{requests}</tbody>
                    </table>
                </Fragment>
            ) : (
                <Fragment>
                    <p> You currently have no active request...</p>
                </Fragment>
            )} 
            <Link to="make_request" className='btn btn-dark' >Make a Request</Link>
        </Fragment>
    );
};

UserRequest.propTypes = {
    user_request: PropTypes.array.isRequired,
    deleteRequest: PropTypes.func.isRequired
}

export default connect(null, {deleteRequest})(UserRequest);
