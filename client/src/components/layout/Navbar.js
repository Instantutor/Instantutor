import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

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
    <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
  );

    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Instantutor
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}
    </nav>

      // c1 <div className='' = "navbar">
      // c1  <a className = "homeB" href="#home">Instantutor</a>
      // c1  <a className='' = "signinB" href = "#signin" > Sign In </a>
      // c1  <a className = "registerB" href = "#register"> Register </a>
      // c1  <a className='' = "aboutB" href = "#about"> About </a>
      // c1 </div>  
    
    //   <nav>  
    //     <div class = "navigation" id = "topnav">
    //         <div class="logo-image">
    //             <img src="../Instantutor.jpg" alt="Logo" id = "toplogo">
    //         </div>
    //     </div>

    //         <div class = "navlinks" id = "toplinks">
    //             <a class = "homeB" href="#home">Instantutor</a>
    //             <a class = "signinB" href = "#signin" > Sign In </a>
    //             <a class = "registerB" href = "#register"> Register </a>
    //             <a class = "aboutB" href = "#about"> About </a>
    //         </div>

    // </nav>   
    
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