import React, { Component, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
//import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';




import './assets/images/gt_favicon.png';
// import './assets/fonts/';
import './assets/css/bootstrap.css';
import './assets/css/font-awesome.css';
import './assets/css/bootstrap-theme.css';
import './assets/css/main.css';
import './assets/css/dashboard.css';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

/*
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
*/



const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
