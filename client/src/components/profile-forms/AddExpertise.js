import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpertise } from '../../actions/profile';

const AddExpertise = ({ addExpertise, history })  => {
    const [formData, setFormData] = useState({
        area: '',
        description: '',
        relatedCourses: ''
    });
    const { area, description, relatedCourses} = formData;

    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
        <h1 className="large text-primary">Add An Expertise</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add any expertise to show you can be a tutor.
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            addExpertise(formData,  history);
          }}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="* Area of Expertise"
              name="area"
              value={area}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
          <input
            type="text"
            placeholder="* Related courses"
            name="relatedCourses"
            value={relatedCourses}
            onChange={onChange}
          />
          <small className="form-text">
            Please tell us courses you learnt about this expertise; Please use comma separated values (eg. course1,course2,...).
          </small>
        </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Expertise Description"
              value={description}
              onChange={onChange}
            />
            <small className="form-text">
              Your may show more about your expertise!
            </small>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    )
}

AddExpertise.propTypes = {
    addExpertise: PropTypes.func.isRequired
}

export default connect(null, {addExpertise})(AddExpertise);
