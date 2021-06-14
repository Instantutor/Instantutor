import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchResultItem =({
    profile: {
        name, 
        avatar
    }
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt='' className='round-img' />
            <div>
                <h2>{name}</h2>
            </div>
      </div>
    )
}

SearchResultItem.propTypes = {
    profile: PropTypes.object.isRequired
};
  
export default SearchResultItem;