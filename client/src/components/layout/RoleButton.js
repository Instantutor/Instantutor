import React, { Fragment } from 'react'

const RoleButton = ({role, toggledRole, setRollToggle }) => {
    console.log(role)
  return (
    <Fragment>
        <button
            className={`role-button tutor
                ${toggledRole ? "active" : ""}
                ${role === "Student" ? "inactive" : ""}`}
            onClick={() => setRollToggle(true)}>
            Tutor</button>
        <button
            className={`role-button student 
                ${toggledRole ? "" : "active"}
                ${role === "Tutor" ? "inactive" : ""}`}
            onClick={() => setRollToggle(false)}>
            Student</button>
    </Fragment>
  )
}

export default RoleButton