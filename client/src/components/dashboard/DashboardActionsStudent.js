import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import formData from '../profile-forms/ProfileForm'


const DashboardActionsStudent = () => {
    return (

        <div class="dash-buttons">
            
            <Link to="/Search" class="btn btn-light"
            ><i class="fas fa-search text-primary"></i> Search bar </Link>
            
            <Link to="/edit-profile" class="btn btn-light"
            ><i class="fas fa-user-circle text-primary"></i> Edit Profile</Link>

        </div>
    )
}


export default DashboardActionsStudent;