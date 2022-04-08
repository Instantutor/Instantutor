import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../assets/images/Instantutor.png';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <ul>
        <li>
          <Link to="/dashboard">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Dashboard</span></Link>
        </li>
        <li>
          <a  onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
  );

  const guestLinks = (
   {/*  <ul>
        {/* <li>
          <Link to="/login">Home</Link>
        </li>
        <li>
          <Link to="/login">About</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li> 
      </ul>*/}
  );

    return (
    //     <nav className="navbar bg-dark">
    //   <h1>
    //     <Link to="/">
    //       <i className="fas fa-code"></i> Instantutor
    //     </Link>
    //   </h1>
    //   { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}
    // </nav>
<div>
<div className='navbar-header'>
  <a class="navbar-brand" href="insta_index.html">
  <img src={logo} style="width: 64px"> 
   Instantutor</a>
</div>
Instantutor\client\src\assets\images\Instantutor.png
Instantutor\client\src\components\layout\Navbar.js

  <div className="navbar-collapse collapse">
     <ul className="nav navbar-nav pull-right">
        <li>
          <Link to="/login">Home</Link>
        </li>
        <li>
          <Link to="/login">About</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
      </ul>
  </div>
</div>

 )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);