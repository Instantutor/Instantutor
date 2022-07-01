import React from 'react';
import PropTypes from 'prop-types';

// Profile page expertise display

const ProfileExpertise = ({
  expertise: { area, course }
}) => (
  <div>
    <h3 className="text-dark">{area}</h3>

    {/* <div>
      {relatedCourses.map((course, index) => (
                            <p key={index} className='text-primary'>
                                <strong className='fas fa-check' /> {course}
                            </p>))}
    </div> */}

    {/* <p>
      <strong>Degree: </strong> {degree}
    </p> */}

    {/* <p>
      <strong>Description: </strong> {description}
    </p> */}
    
  </div>
);

ProfileExpertise.propTypes = {
    expertise: PropTypes.object.isRequired
};

export default ProfileExpertise;