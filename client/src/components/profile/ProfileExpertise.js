import React from 'react';
import PropTypes from 'prop-types';

// Profile page expertise display

const ProfileExpertise = ({
  expertise: { relatedCourses, area, degree, description }
}) => (
  <div>
    <h3 className="text-dark">{area}</h3>

    <p>
      {relatedCourses.map((course, index) => (
                            <div key={index} className='text-primary'>
                                <p className='fas fa-check' /> {course}
                            </div>))}
    </p>

    <p>
      <strong>Degree: </strong> {degree}
    </p>

    <p>
      <strong>Description: </strong> {description}
    </p>
    
  </div>
);

ProfileExpertise.propTypes = {
    expertise: PropTypes.object.isRequired
};

export default ProfileExpertise;