import React from 'react'
import { Link, NavLink } from 'react-router-dom';
//import formData from '../profile-forms/ProfileForm'


const DashboardActions = () => {
    return (

        <div className="dash-buttons">
            
            <Link to="/search" className="btn btn-light"
            ><i className="fas fa-search text-primary"></i> Search bar </Link>

            <Link to="/request" className="btn btn-light"
            ><i className="fas fa-share-square text-primary"></i> Make Request </Link>
            
            <Link to="/edit_profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>

            <Link to="/add_expertise" className="btn btn-light"
            ><i className="fas fa-user-graduate text-primary"></i> Add Expertise</Link>

            <Link to="/peer_request" className="btn btn-light"
            ><i className="fas fa-inbox text-primary"></i> Received Request </Link>
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