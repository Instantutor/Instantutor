import React, { Component, Fragment, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Dashboard from '../dashboard/Dashboard'

// Edit Profile
import ProfileForm from '../profile-forms/ProfileForm'
import ExpertiseForm from '../profile-forms/ExpertiseForm'

// Profile display
import Profile from '../profile/Profile'

// Wrappers for different layouts
import LandingRoute from './LandingRoute'
import NavbarRoute from './NavbarRoute'
import SidebarRoute from './SidebarRoute'

//Not found page
import NotFound from '../layout/NotFound'

//Request page
import UserRequest from '../user-requests/UserRequest'
import UserRequestHistory from '../user-requests/UserRequestHistory'
import UserRequestMatchedTutor from '../user-requests/UserRequestMatchedTutor'
import RequestHistory from '../requests/RequestHistory'

import PeerRequestPage from '../peer-requests/PeerRequestPage'
import FinalizeRequestPage from '../finalize-requests/FinalizeRequestPage'

// Browse
import Browse from '../browse/Browse'
import SelectRequest from '../browse/SelectRequest'

// Search page
import Search from '../search/Search'

// Calendar
import TempCalendarPage from '../calendar/TempCalendarPage'

// Sidebar
import Sidebar from '../layout/Sidebar'

/*
class SearchContainer extends Component {
    state = {
        major: [],
        question: [],
        searchField: '',
        inputvalue: ''
    }
}
*/

const Routes = () => {
    return (
        <Fragment>
            <Switch>
                <LandingRoute exact path="/" />
                <NavbarRoute exact path="/register" component={Register} />
                <NavbarRoute exact path="/login" component={Login} />
                <SidebarRoute selected="dashboard" privateR exact path="/dashboard" component={Dashboard} />

                <SidebarRoute selected="dashboard" privateR exact path="/make_request" component={UserRequest} />
                <SidebarRoute selected="dashboard" privateR exact path="/edit_request/:id" component={UserRequest} />
                <SidebarRoute selected="history" privateR exact path="/requests" component={UserRequestHistory} />
                <SidebarRoute selected="history" privateR exact path="/request_history" component={RequestHistory} />
                <SidebarRoute selected="dashboard" privateR exact path="/request_matched_tutors/:id" component={UserRequestMatchedTutor} />
                <SidebarRoute selected="dashboard" privateR exact path="/finalize_request/:id" component={FinalizeRequestPage} />
                {/* <SidebarRoute selected="browse" privateR exact path="/peer_request" component={PeerRequestPage} /> */}

                {/* <SidebarRoute privateR exact path="/calendar" component={TempCalendarPage} /> */}

                {/* <SidebarRoute privateR exact path="/search" component={Search} /> */}

                <SidebarRoute selected="profile" exact path="/profile/:id" component={Profile} />
                {/* <SidebarRoute exact path="/profile" component={Profile} /> */}
                <SidebarRoute selected="profile" privateR exact path="/create_profile" component={ProfileForm} />
                <SidebarRoute selected="profile" privateR exact path="/edit_profile" component={ProfileForm} />

                {/* <SidebarRoute selected="profile" privateR exact path="/add_expertise" component={ExpertiseForm} />
                <SidebarRoute selected="profile" privateR exact path="/edit_expertise/:id" component={ExpertiseForm} /> */}

                <SidebarRoute selected="browse" privateR exact path="/browse" component={Browse} />
                
                <SidebarRoute exact path="/select_request/:id" component={SelectRequest} />

                <Route component={NotFound} />
            </Switch>
        </Fragment>
    )
}              

export default Routes;
