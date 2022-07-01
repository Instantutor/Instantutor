import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getTutors } from '../../actions/profile'

const Browse = ({ profile, profiles, getTutors}) => {
    useEffect(() => {
        getTutors();
    }, [])

    return (
        <div>
            { profiles.map((profile, num) => (<div key={num}>{profile.name}</div>))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    profiles: state.profile.profiles
})

export default connect(mapStateToProps, { getTutors })(Browse)