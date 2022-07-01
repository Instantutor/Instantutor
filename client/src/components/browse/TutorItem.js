import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const TutorItem = ({ profile }) => {
    const { avatar, name, _id } = profile;

    return (
        <div className="profile bg-white p-2">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
            </div>

            <Link
            to={`/profile/${_id}`}
            className="btn btn-primary"
            >
            <i className="fas fa-user-circle"> </i> View Profile
            </Link>

        </div>
    )
}

export default TutorItem