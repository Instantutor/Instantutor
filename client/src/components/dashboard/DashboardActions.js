import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import formData from '../profile-forms/ProfileForm'


const DashboardActions = () => {
    return (

        <div class="dash-buttons">
            
            <Link to="/Search" class="btn btn-light"
            ><i class="fas fa-search text-primary"></i> Search bar </Link>
            
            <Link to="/edit-profile" class="btn btn-light"
            ><i class="fas fa-user-circle text-primary"></i> Edit Profile</Link>

            <Link to="/add-expertise" class="btn btn-light"
            ><i class="fas fa-user-graduate text-primary"></i> Add Expertise</Link>
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