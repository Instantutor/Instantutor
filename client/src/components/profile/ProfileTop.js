import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// Profile top page, will show personal information and contact info

const ProfileTop = ({
    profile: {
        location,
        degree,
        website,
        social
    },
    user: { name, avatar }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      {/* {auth.isAuthenticated &&
      auth.loading === false &&
      auth.user._id === peer_profile.user._id && (

          <Link to="/edit_profile" className="btn btn-dark">
              Edit Profile
          </Link>
      )} */}
      <Link to="/edit_profile" className="btn btn-dark">
        <img src={require('../../assets/Instantutor Icons/edit-solid.png')} id='edit-profile-btn-img'/>
        Edit Profile
      </Link>

      <p>{degree}</p>
      
      <p>{location ? <span>{location}</span> : null}</p>
      <div className="icons my-1">
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop;