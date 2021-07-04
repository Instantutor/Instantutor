import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExpertise from './ProfileExpertise';

// Main Profile display page
//  Will show ProfileTop; ProfileAbout and ProfileExperience... 

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, 
        [getProfileById, match.params.id]
    );

    return (
        <Fragment>
            
            {profile === null || profile.user == null ? (
                <Spinner />
            ) : (
                <Fragment> 

                    <Link to="/search" className="btn btn-light">
                        Back To Search
                    </Link>

                    {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === profile.user._id && (

                        <Link to="/edit_profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                    )}
                    
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                    </div>

                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Expertise</h2>
                        {profile.expertise.length > 0 ? (
                            <Fragment>
                            {profile.expertise.map((expertise) => (
                                <ProfileExpertise
                                key={expertise._id}
                                expertise={expertise}
                                />
                            ))}
                            </Fragment>
                        ) : (
                            <h4>No experience credentials</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});
  
export default connect(mapStateToProps, { getProfileById })(Profile);