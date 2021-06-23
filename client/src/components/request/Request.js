import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DatePicker } from 'antd'
import 'antd/dist/antd.css';
import formData from '../profile-forms/ProfileForm'
import { createRequest } from '../../actions/request';

const { RangePicker } = DatePicker;

const Request = ({createRequest}) => {
    const [requestData, setRequestData] = useState({
        request: '',
        course: '',
        grade: '',
        topic: '',
        help_time: '',
        availability: [],
        number_sessions: ''
    });

    const { request, course, grade, topic, help_time, availability, number_sessions} = requestData;
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

                <div className="form-group">
                    <DatePicker onChange={
                        (date) => setRequestData({ ...requestData, help_time: date })
                    } />
                </div>

                <div className="form-group">
                    <RangePicker onChange={
                        (dates) => {
                            setRequestData({ ...requestData,
                                availability: requestData.availability.concat([{range_start: dates[0], range_end: dates[1]}]) });
                        }
                    } />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="How many sessions do you want help with?"
                        name="number_sessions"
                        value={number_sessions}
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
