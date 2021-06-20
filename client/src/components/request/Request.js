import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formData from '../profile-forms/ProfileForm'
import { createRequest } from '../../actions/request';

const Request = ({createRequest}) => {
    const [requestData, setRequestData] = useState({
        request: '',
        course: '',
        grade: '',
        topic: ''
    });

    const { request, course, grade, topic} = requestData;
    const onChange = e => setRequestData({ ...requestData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        await createRequest(requestData);
    };

    return (
        <>
            {(formData.role==='Student'||'Both') && (
            <Fragment>

            <h1 className="large text-primary">Open a Request!</h1>
            <small>* = required field</small>

            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* What do you need help with?"
                    name="request"
                    value={request}
                    onChange={onChange} />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Subject"
                        name="course"
                        value={course}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <select name="grade" value={grade} onChange={onChange}>
                    <option>What is the level of this problem?</option>
                    <option value="None">Don't know</option>
                    <option value="K-12">K-12</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="PHD">PHD</option>
                    </select>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Topic"
                        name="topic"
                        value={topic}
                        onChange={onChange}
                    />
                </div>
                
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
                </form>
            </Fragment>
            )}

          
        </>
    )
};

/*
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {createRequest })(Request);
*/

Request.propTypes = {
    createRequest: PropTypes.func.isRequired
}

export default connect(null, {createRequest })(Request);
