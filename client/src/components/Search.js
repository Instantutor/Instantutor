import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Source from './Source'
import formData from './profile-forms/ProfileForm'
import SearchContainer from '../App';
import { createRequest } from '../actions/search';


const Search = (props) => {
    //const [img, setImg] = useState("");
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
        createRequest(requestData);

    };
    /*
    const InputEvent = (event) => {
        const data = event.target.value;
        console.log(data);
        setImg(data);
    };
    */
    return (
        <>
            {(formData.role=='Student'||'Both') && (
            <Fragment>

            <h1 class="large text-primary">Open a Request!</h1>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="What do you need help with?"
                    value={request}
                    onChange={onChange} />
                {/*(<Source name={img} />*/}
            </div>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Course"
                        name="course"
                        value={course}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Grade"
                        name="grade"
                        value={grade}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Topic"
                        name="topic"
                        value={topic}
                        onChange={e => onChange(e)}
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {createRequest })(Search);
//export default Search;