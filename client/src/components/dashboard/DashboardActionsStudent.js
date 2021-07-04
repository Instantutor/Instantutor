import React from 'react'
import { Link, NavLink } from 'react-router-dom';
//import formData from '../profile-forms/ProfileForm'


const DashboardActionsStudent = () => {
    return (

        <div className="dash-buttons">
            
            <Link to="/search" className="btn btn-light"
            ><i className="fas fa-search text-primary"></i> Search bar </Link>

            <Link to="/request" className="btn btn-light"
            ><i className="fas fa-share-square text-primary"></i> Make Request </Link>
            
            <Link to="/edit_profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>

        </div>
    )
}


export default DashboardActionsStudent;