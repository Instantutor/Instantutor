import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';

// Edit Profile
import ProfileForm from '../profile-forms/ProfileForm';
import AddExpertise from '../profile-forms/AddExpertise';

// Profile display
import Profile from '../profile/Profile';

//Force user to log in, protact dashboard
import PrivateRoute from '../routing/PrivateRoute';

//did not found page
import NotFound from '../layout/NotFound';

//Request page
import Request from '../request/Request';
import RequestPage from '../request/RequestPage';

// Search page
import Search from '../search/Search'

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
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/request" component={Request} />
                <PrivateRoute exact path="/RequestPage" component={RequestPage} />
                <PrivateRoute exact path="/search" component={Search} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/create-profile" component={ProfileForm} />
                <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
                <PrivateRoute exact path="/add-expertise" component={AddExpertise} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}              

export default Routes;