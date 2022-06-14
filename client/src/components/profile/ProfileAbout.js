import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Show profile's Bio and Skills

const ProfileAbout = ({
    profile : {bio, expertise} , name
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
        <Fragment>
            <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
            <p>{bio}</p>
            <div className='line' />
        </Fragment>
    )}
    {
        expertise.length > 0 && (
            <Fragment>
                    <h2 className='text-primary'>Skill Set</h2>
                    <div className='skills'>
                        {expertise.map((expert, index) => (
                            <div key={index} className='p-1'>
                                <i className='fas fa-check' /> {expert.area}
                            </div>
                        ))}
                    </div>
            </Fragment>
        )
    }
  </div>
);

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout;