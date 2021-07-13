import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';
//import { checkNewPeerRequest } from '../../actions/request';

import DashboardActions from './DashboardActions';
import DashboardActionsStudent from './DashboardActionsStudent';
import Spinner from '../layout/Spinner';

import Expertise from './Expertise';
//import { render } from 'react-dom';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading }, 
    //checkNewPeerRequest,
}) => {

    useEffect(() => {
        getCurrentProfile();
        //checkNewPeerRequest();
    }, []);
    return loading ? <Spinner /> :
        <Fragment>
        
            {profile !== null ? (
                <Fragment>

                    <h1 className="large text-primary"> Personal page </h1>
                    <p className="lead">
                        <i className='fas fa-user '></i> Welcome, 

                        <Fragment>
                                {profile.role === 'Both' ? (
                                        <i> Tutor & Student </i>
                                    ) : (
                                        <i> {" " + profile.role} </i>
                                    )
                                }
                        </Fragment>
                        
                        {user && user.name}
                    </p>

                    {profile.role === 'Student' ? (
                            <DashboardActionsStudent/>
                        ) : (
                            <Fragment>
                                <DashboardActions />
                                <Expertise expertise = {profile.expertise}/>
                            </Fragment>
                        )
                    }

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-minus"></i>
                        Delete My Account
                    </button>
                    </div>

                </Fragment>
            ) : (
                <Fragment>
                    <p> You have not yet setup a profile, please add some info</p>
                    <Link to='/create_profile' className='btn btn-primary my-1'>
                        Create Profile
                </Link>
                </Fragment>
            )}
        </Fragment>




};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    //checkNewPeerRequest: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps, {
    getCurrentProfile,
    deleteAccount,
    //checkNewPeerRequest
})(
    Dashboard
);