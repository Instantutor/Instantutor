import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Forgot from '../auth/Forgot';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';

// Edit Profile
import ProfileForm from '../profile-forms/ProfileForm';
import ExpertiseForm from '../profile-forms/ExpertiseForm';

// Profile display
import Profile from '../profile/Profile';

//Force user to log in, protact dashboard
import PrivateRoute from '../routing/PrivateRoute';

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
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/Forgot" component={Forgot}></Route>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />

                <PrivateRoute exact path="/make_request" component={UserRequest} />
                <PrivateRoute exact path="/edit_request/:id" component={UserRequest} />
                <PrivateRoute exact path="/requests" component={UserRequestHistory} />
                <PrivateRoute exact path="/request_matched_tutors/:id" component={UserRequestMatchedTutor} />
                <PrivateRoute exact path="/finalize_request/:id" component={FinalizeRequestPage} />
                <PrivateRoute exact path="/peer_request" component={PeerRequestPage} />

                <PrivateRoute exact path="/calendar" component={TempCalendarPage} />

                <PrivateRoute exact path="/search" component={Search} />

                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/create_profile" component={ProfileForm} />
                <PrivateRoute exact path="/edit_profile" component={ProfileForm} />

                <PrivateRoute exact path="/add_expertise" component={ExpertiseForm} />
                <PrivateRoute exact path="/edit_expertise/:id" component={ExpertiseForm} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes;
