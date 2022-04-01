import React, { Component, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
//import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


import './App.css';

//import './assetsNewimages/gt_favicon.png';
//import './assetsNew/fonts/';
import './assetsNew/css/bootstrap.css'
//import './assetsNew/css/fonts/fontawesome.css'
import './assetsNew/css/bootstrap-theme.css'
import './assetsNew/css/main.css'
//@import URL("http://fonts.googleapis.com/css?family=Open+Sans:300,400,700");

// <link rel="shortcut icon" href="assetsNewimages/gt_favicon.png">
	
// 	<link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
// 	<link rel="stylesheet" href="assetsNewcss/bootstrap.css">
// 	<link rel="stylesheet" href="assetsNewcss/font-awesome.css">

// 	<!-- Custom styles -->
// 	<link rel="stylesheet" href="assetsNewcss/bootstrap-theme.css" media="screen" >
// 	<link rel="stylesheet" href="assetsNewcss/main.css"></link>

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
          <Navbar />
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
