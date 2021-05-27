import React, { Component, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
import { LOGOUT } from './actions/types';
import Search from './components/Search';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


import './App.css';
import formData from './components/profile-forms/ProfileForm';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      stats: [],
      searchField:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
  }

  
}




const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
