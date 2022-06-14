import React, { Component, Fragment, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';

// Edit Profile
import ProfileForm from '../profile-forms/ProfileForm';
import ExpertiseForm from '../profile-forms/ExpertiseForm';

// Profile display
import Profile from '../profile/Profile';

//Force user to log in, protact dashboard
import PrivateRoute from '../routing/PrivateRoute';

// Wrappers for different layouts
import LandingRoute from './LandingRoute';
import NavbarRoute from './NavbarRoute';
import SidebarRoute from './SidebarRoute';

//Not found page
import NotFound from '../layout/NotFound';

//Request page
import UserRequest from '../user-requests/UserRequest';
import UserRequestHistory from '../user-requests/UserRequestHistory';
import UserRequestMatchedTutor from '../user-requests/UserRequestMatchedTutor';

import PeerRequestPage from '../peer-requests/PeerRequestPage';
import FinalizeRequestPage from '../finalize-requests/FinalizeRequestPage';


// Search page
import Search from '../search/Search';

// Calendar
import TempCalendarPage from '../calendar/TempCalendarPage'

// Sidebar
import Sidebar from '../layout/Sidebar';

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
                <SidebarRoute privateR exact path="/dashboard" component={Dashboard} />

                <SidebarRoute privateR exact path="/make_request" component={UserRequest} />
                <SidebarRoute privateR exact path="/edit_request/:id" component={UserRequest} />
                <SidebarRoute privateR exact path="/requests" component={UserRequestHistory} />
                <SidebarRoute privateR exact path="/request_matched_tutors/:id" component={UserRequestMatchedTutor} />
                <SidebarRoute privateR exact path="/finalize_request/:id" component={FinalizeRequestPage} />
                <SidebarRoute privateR exact path="/peer_request" component={PeerRequestPage} />

                {/* <SidebarRoute privateR exact path="/calendar" component={TempCalendarPage} /> */}

                {/* <SidebarRoute privateR exact path="/search" component={Search} /> */}

                <SidebarRoute exact path="/profile/:id" component={Profile} />
                {/* <SidebarRoute exact path="/profile" component={Profile} /> */}
                <SidebarRoute privateR exact path="/create_profile" component={ProfileForm} />
                <SidebarRoute privateR exact path="/edit_profile" component={ProfileForm} />

                <SidebarRoute privateR exact path="/add_expertise" component={ExpertiseForm} />
                <SidebarRoute privateR exact path="/edit_expertise/:id" component={ExpertiseForm} />
                <Route component={NotFound} />
            </Switch>
        </Fragment>
    )
}              

export default Routes;