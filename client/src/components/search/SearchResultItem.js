import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchResultItem =({
    profile: {
        user: { _id, name, avatar },
        degree,
        role,
        major
      }
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt='' className='round-img' />
            <div>
                <h2>{name}</h2>
                <p>
                <Fragment>
                    {role == 'Both' ? (
                        <>  Tutor & Student</> 
                    ) : (
                        role
                    )
                    }
                </Fragment>
                </p>
            </div>
            
            <p>
                {degree} 
            </p>
            
            <Link to={`/profile/${_id}`} className='btn btn-primary'>
                View Profile
            </Link>

            <ul>
                {major.map((major_item, index) => (
                    <li  key={index} className='text-primary'>
                        <i className='fas fa-check' /> {major_item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

SearchResultItem.propTypes = {
    profile: PropTypes.object.isRequired
};
  
export default SearchResultItem;