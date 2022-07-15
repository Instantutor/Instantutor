import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TutorItem from './TutorItem'
import RequestItem from './RequestItem'
import RoleButton from '../layout/RoleButton'
import Spinner from '../layout/Spinner'
import { getTutors, getCurrentProfile } from '../../actions/profile'
import { getOpenPeerRequests } from '../../actions/request'

const Browse = ({ 
    profile: { profile },
    profiles,
    open_requests,
    getTutors,
    getCurrentProfile,
    getOpenPeerRequests }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])

    // by default role is false indicating student
    var role = false;
    if (profile && profile.role && profile.role === "tutor")
        role = true;

    const [selectedRole, toggleSelectedRole] = useState(role);
    console.log(profiles)

    useEffect(() => {
        if (!selectedRole)
            getTutors();
        else
            getOpenPeerRequests();
    }, [selectedRole, getTutors, getOpenPeerRequests])

    return (
        <div>
            <h1 className="large text-primary">
                {selectedRole ? "Browse student requests" : "Browse tutors"}
            </h1>
            <RoleButton 
                role={profile ? profile.role : false}
                toggledRole={selectedRole}
                setRollToggle={toggleSelectedRole} /> 
            { !selectedRole ? 
                profiles 
                    ? profiles.map((profile, num) => profile != null && <TutorItem profile={profile} key={num} />)
                    : <Spinner />:
                open_requests
                    ? open_requests.map((request, num) => <RequestItem peer_request={request} key={num} />)
                    : <Spinner />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    profiles: state.profile.profiles,
    open_requests: state.peer_requests.open_requests
})

export default connect(mapStateToProps, { 
    getTutors, 
    getCurrentProfile, 
    getOpenPeerRequests
})(Browse)