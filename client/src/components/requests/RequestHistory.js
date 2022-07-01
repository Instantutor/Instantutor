import { Fragment, useEffect, useState } from 'react'
import { getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux'
import PeerRequestPage from '../peer-requests/PeerRequestPage'
import UserRequestHistory from '../user-requests/UserRequestHistory'
import RoleButton from '../layout/RoleButton'

const RequestHistory = ({ profile, getCurrentProfile, match }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  var role = false
  
  if (profile && profile.role === 'Tutor') {
    role = true
  }
  const [selectedRole, toggleSelectedRole] = useState(role)

  return (
    <div>
      <h1 className='large text-primary'>
        {selectedRole ? 'Peer Request History' : 'Your Request History'}
      </h1>
      <RoleButton
        role={profile ? profile.role : false}
        toggledRole={selectedRole}
        setRollToggle={toggleSelectedRole}
      />

      {selectedRole ? (
        <PeerRequestPage />
      ) : (
        <UserRequestHistory match={match} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(RequestHistory)
