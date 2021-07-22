import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MatchedTutorItem =(tutor) => {
    let {
        name,
        _id,
        avatar,
        bio
    } = tutor.item

    return (
        <div className='profile bg-white p-2'>
            <img src={avatar} alt='' className='round-img' />
            <div>
                <h2>{name}</h2>
                {bio &&                 
                    <p>
                        <i className="far fa-address-card"> {" " + bio} </i>
                    </p>
                }

            </div>
            
            <Link to={`/profile/${_id}`} target="_blank" className='btn btn-primary'>
                <i className="fas fa-user-circle"> </i> View Profile
            </Link>
        </div>
    )
    
}

MatchedTutorItem.propTypes = {
    tutor: PropTypes.object
};
  
export default MatchedTutorItem;