import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';

import ProfileForm from '../profile-forms/ProfileForm';
import AddExpertise from '../profile-forms/AddExpertise';
//Force user to log in, protact dashboard
import PrivateRoute from '../routing/PrivateRoute';

//did not found page
import NotFound from '../layout/NotFound';


//search
import Search from '../Search';

class SearchContainer extends Component {
    state = {
        major: [],
        question: [],
        searchField: '',
        inputvalue: ''
    }
}

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/Search" component={Search} />
                <PrivateRoute exact path="/create-profile" component={ProfileForm} />
                <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
                <PrivateRoute exact path="/add-expertise" component={AddExpertise} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes;