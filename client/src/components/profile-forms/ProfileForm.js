import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { deleteAccount } from '../../actions/profile';
// import { addUser } from '../../actions/search';
//import formData from '../auth/Register';
const courses = require("../../course_list.json");

const initialState = {
  degree: '',
  major: '',
  role: '',
  location: '',
  classes: '',
  subjects: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  deleteAccount,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();

    // Upload profile to 'setFormData' if user profile existed
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
    return () => {
      setFormData({});
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    degree,
    major,
    role,
    location,
    classes,
    subjects,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Decide create new profile or update by the existance of profile
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">{profile ? "Edit Your Profile" : "Create Your Profile"}</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="degree" value={degree} onChange={onChange}>
            <option>* Select Your Degree</option>
            <option value="K-12">K-12</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="PHD">PHD</option>
          </select>
          <small className="form-text">
            Type your degree of study so that we can get precise matching.
          </small>
        </div>

        <div className="form-group">
          <select name="major" value={major} onChange={onChange}>
            <option>* Select Your Major</option>
            {courses.subject_list.map(subj => <option key={subj} value={subj}>{subj}</option>)}
          </select>
          <small className="form-text">
            Please tell us your major of study
          </small>
        </div>

        <div className="form-group">
          <select name="role" value={role} onChange={onChange}>
            <option>* Select Your Role</option>
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
            <option value="Both">Both</option>
          </select>
          <small className="form-text">
            Select your role (Student, Tutor, or Both!)
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            Could you please tell us your location?
            City & state suggested (eg. Boston, MA)
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short description of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself </small>
        </div>

        <div className="my-2">
          {/* <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span> */}
          {role !== "Student" &&
            <Link to="/add_expertise" className="btn btn-light"
            ><i className="fas fa-user-graduate text-primary"></i> Add Expertise </Link>
          }
        </div>

        {/* {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )} */}

        <button
          onClick={() => window.history.back(-1)}
          className="btn btn-dark"
        >
          Go Back
        </button>
        <input type="submit" className="btn btn-primary my-1" />
        {profile && <button className="btn btn-danger my-1" onClick={() => deleteAccount()}>
          Delete Account
        </button> }
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile, deleteAccount })(
  ProfileForm
);