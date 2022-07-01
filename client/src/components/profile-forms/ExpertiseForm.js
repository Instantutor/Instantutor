import React, { Fragment, useState, useEffect, Button } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpertise, getCurrentProfile } from '../../actions/profile';
import ExpertiseBox from './ExpertiseBox';
const courses = require("../../course_list.json");

const initialState = {
  area: "",
  course: "",
};

const ExpertiseForm = ({ expertise, parentData, setParentData })  => {
    const [formData, setFormData] = useState(initialState);
    const { area, course} = formData;

    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const addCourse = () => {
      if (course == "") return;

      if (expertise.includes(formData)) return;

      setParentData({ ...parentData, "expertise" : [ ...expertise, formData] })
    }

    const removeExpertise = (e, exp) => {
      let new_expertise = expertise.filter(obj => obj != exp)

      setParentData({ ...parentData, "expertise" : new_expertise })
    }

    return (
        <Fragment>
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
            <div className="add-course">
              <select name="course" value={course} onChange={onChange}>
                <option value="">Related courses</option>
                  {area in courses.course_list
                    ? courses.course_list[area].map(enteredCourse => <option value={enteredCourse}>{enteredCourse}</option>)
                    : null
                  }
              </select>
              <div className="add-expertise" onClick={addCourse}>
                <i className="fas fa-plus"></i>
                  {" Add a course "}
              </div>
            </div>
            <small className="form-text">
              * Choose courses to add
            </small>
            <div>
            <fieldset>
              {expertise !== null && expertise !== undefined
              && expertise.length > 0 ? expertise.map(form =>
              <ExpertiseBox expertise={form} removeExpertise={removeExpertise} />) : null}
            </fieldset>
            </div>
          </div>

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
