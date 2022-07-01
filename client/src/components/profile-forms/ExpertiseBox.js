import React from 'react'

const ExpertiseBox = ({expertise, removeExpertise}) => {
  return (
    <span className="expertise-box">
        {expertise.area}<b>|</b>{expertise.course}
        <i className="fas fa-times" onClick={e => removeExpertise(e, expertise)}/>
    </span>
  )
}

export default ExpertiseBox