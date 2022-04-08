import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpertise, getCurrentProfile } from '../../actions/profile';
import * as courses from "../../course_list.json"

const initialState = {
  area: '',
  degree: '',
  description: '',
  relatedCourses: ''
};


const ExpertiseForm = (
    { addExpertise, 
      match, 
      profile: { profile, loading }, 
      getCurrentProfile, 
      history 
    })  => {

    const [formData, setFormData] = useState(initialState);
    const { area, degree, description, relatedCourses} = formData;
    
    // Check if expertise_id in URL esists
    let expertise_id = match.params.id
    
    // Fill the form with data if id is provided
    useEffect(() => {
      if (expertise_id){

        //console.log(expertise_id);
        
        if (! profile)
          getCurrentProfile();

        if (! loading && profile) {
          const expertise_data = {...initialState};

          const expertiseIndex = profile.expertise
            .map((item) => item._id)
            .indexOf(expertise_id);
          const exist_expertise = profile.expertise[expertiseIndex];

          for (const key in exist_expertise){
            if (key in expertise_data){
              expertise_data[key] = exist_expertise[key];
            }
          }

          setFormData(expertise_data);
        }
      }
      return () => {
        setFormData({});
      }
    }, [loading, getCurrentProfile, profile, expertise_id]);

    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
        <h1 className="large text-primary">Manage your Expertise</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add any expertise to show you can be a tutor.
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            addExpertise(formData,  history, expertise_id);
          }}
        >
          <div className="form-group">
            <select name="area" value={area} onChange={onChange}>
            <option value="">Area of expertise</option>
              {courses.subject_list.map(subj => <option value={subj}>{subj}</option>)}
            </select>
            <small className="form-text">
              * What subject is an area of your expertise
            </small>
          </div>

          <div className="form-group">
            <select name="degree" value={degree} onChange={onChange}>
              <option>Degree level</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PHD">PHD</option>
              <option value="Worked">Worked</option>
            </select>
            <small className="form-text">
              * Choose a degree level
            </small>
          </div>
          
          <div className="form-group">
            <select name="relatedCourses" value={relatedCourses} onChange={onChange}>
              <option value="">Related course</option>
                {area in courses.course_list
                  ? courses.course_list[area].map(course => <option value={course}>{course}</option>)
                  : null
                }
            </select>
            <small className="form-text">
              * Fill in a course related to this area of expertise
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

const mapStateToProps = state => ({
  profile: state.profile
});

ExpertiseForm.propTypes = {
    addExpertise: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  {addExpertise, getCurrentProfile}
)(ExpertiseForm);
