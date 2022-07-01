import React from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getTutors } from '../../actions/profile'

const Student = () => {
  return (
    <div>Student</div>
  )
}

const mapStateToProps = (state) => {
    profiles: state.profile.profiles
}

export default connect(mapStateToProps, { getTutors })(Browse)