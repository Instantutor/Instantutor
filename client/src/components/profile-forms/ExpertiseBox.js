import React from 'react'

const ExpertiseBox = ({area, course, removeCourse}) => {
  return (
    <span>
        {area}|{course}
        <i className="fas fa-times" onClick={e => removeCourse(e, course)}/>
    </span>
  )
}

export default ExpertiseBox