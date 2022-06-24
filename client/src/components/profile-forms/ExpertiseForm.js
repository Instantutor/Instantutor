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

const ExpertiseForm = (
    { addExpertise,
      match,
      profile: { profile, loading },
      getCurrentProfile,
      history
    })  => {

    const [formData, setFormData] = useState(initialState);
    const [allCourses, setAllCourses] = useState([]);
    const { area, degree, description, course} = formData;

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
      setFormData({ ...formData, [e.target.name]: e.target.value,});

    const addCourse = (e, course) => {
      if (course == "") return;
      if (!(allCourses.includes(course))) {
        setAllCourses([...allCourses, formData]);
        setFormData({initialState});
      }
    }

    const removeCourse = (e, course) => {
      setAllCourses(allCourses.filter(val => val.course != course));
    }

    return (
        <Fragment>
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
            <div className="add-course">
              <select name="course" value={course} onChange={onChange}>
                <option value="">Related courses</option>
                  {area in courses.course_list
                    ? courses.course_list[area].map(enteredCourse => <option value={enteredCourse}>{enteredCourse}</option>)
                    : null
                  }
              </select>
              <div className="add-expertise" onClick={e => addCourse(e, course)}>
                <i className="fas fa-plus"></i>
                  {" Add a course "}
              </div>
            </div>
            <small className="form-text">
              * Choose courses to add
            </small>
            <div>
            <fieldset>
              {allCourses !== null && allCourses !== undefined
              && allCourses.length > 0 ? allCourses.map(form =>
              <ExpertiseBox area={form.area} course={form.course} removeCourse={removeCourse} />) : null}
            </fieldset>
            </div>
          </div>

         
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
