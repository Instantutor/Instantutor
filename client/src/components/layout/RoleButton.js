import React, { Fragment } from 'react'

const RoleButton = ({ role, toggledRole, setRollToggle }) => {
  
  return (
    <Fragment>
      <button
        className={`role-button tutor
                ${toggledRole ? 'active' : ''}
                ${role === 'Student' ? 'inactive' : ''}`}
        onClick={() => setRollToggle(true)}
        disabled={role === 'Student'}
      >
        Tutor
      </button>
      <button
        className={`role-button student 
                ${toggledRole ? '' : 'active'}
                ${role === 'Tutor' ? 'inactive' : ''}`}
        onClick={() => setRollToggle(false)}
        disabled={role === 'Tutor'}
      >
        Student
      </button>
    </Fragment>
  )
}

export default RoleButton
