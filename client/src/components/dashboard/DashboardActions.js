import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom';
//import formData from '../profile-forms/ProfileForm'


const DashboardActions = ({ role }) => {
    return (

        <div className="dash-buttons">
            
            <Link to="/search" className="btn btn-light"
            ><i className="fas fa-search text-primary"></i> Search bar </Link>

            {role !== "Tutor" ?
                <Link to="/requests" className="btn btn-light"
                ><i className="fas fa-share-square text-primary"></i> Your requests </Link>
                : <Fragment />
            }
            
            <Link to="/edit_profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Edit Profile </Link>

            {role !== "Student" ?
                <Link to="/add_expertise" className="btn btn-light"
                ><i className="fas fa-user-graduate text-primary"></i> Add Expertise </Link>
                : <Fragment />
            }

            {role !== "Student" ?
                <Link to="/peer_request" className="btn btn-light"
                ><i className="fas fa-inbox text-primary"></i> Received Request </Link>
                : <Fragment />
            }
            {/* <Link to= "/VideoPage" className = "btn btn-light"></Link> */}

        </div>
    )
}

// Experience and education, not need currently
/*
            <Link to="/add-experience" class="btn btn-light"
            ><i class="fab fa-black-tie text-primary"></i> Add Experience</Link>

            <Link to="/add-education" class="btn btn-light"
            ><i class="fas fa-graduation-cap text-primary"></i> Add Education</Link>
*/

export default DashboardActions;