import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExpertise from './ProfileExpertise';

// Main Profile display page
//  Will show ProfileTop; ProfileAbout and ProfileExperience... 

const Profile = ({ getProfileById, getCurrentProfile, profile: { profile, peer_profile }, auth, match }) => {
    useEffect(() => {
        if (match.params.id !== null && match.params.id !== undefined)
            getProfileById(match.params.id);
        
        getCurrentProfile();
    }, 
        [getProfileById, getCurrentProfile, match.params.id]
    );

    if (match.params.id === null || match.params.id === undefined)
        peer_profile = profile

    return (
        <Fragment>
            
            {peer_profile === null || peer_profile === undefined || peer_profile.user == null ? (
                <Spinner />
            ) : (
                <Fragment> 

                    {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === peer_profile.user._id && (

                        <Link to="/edit_profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                    )}
                    
                    <div className="profile-grid my-1">
                        <ProfileTop
                            profile={peer_profile}
                            user={(match.params.id === null || match.params.id === undefined)
                                ? auth.user : peer_profile.user } />
                        <ProfileAbout
                            profile={peer_profile}
                            name={(match.params.id === null || match.params.id === undefined)
                                ? auth.user.name : peer_profile.user.name } />
                    </div>

                    {/* <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Expertise</h2>
                        {peer_profile.expertise.length > 0 ? (
                            <Fragment>
                            {peer_profile.expertise.map((expertise) => (
                                <ProfileExpertise
                                key={expertise._id}
                                expertise={expertise}
                                />
                            ))}
                            </Fragment>
                        ) : (
                            <h4>No experience credentials</h4>
                        )}
                    </div> */}
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
  
export default connect(mapStateToProps, { getProfileById, getCurrentProfile })(Profile);