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
          <i classNameName="fas fa-sign-out-alt"></i>{' '}
          <span classNameName="hide-sm">Dashboard</span></Link>
        </li>
        <li>
          <a  onClick={logout} href="#!">
            <i classNameName="fas fa-sign-out-alt"></i>{' '}
            <span classNameName="hide-sm">Logout</span>
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
        <nav classNameName="navbar bg-dark">
      <h1>
        <Link to="/">
          <i classNameName="fas fa-code"></i> Instantutor
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}
    </nav>

      // c1 <div classNameName='' = "navbar">
      // c1  <a classNameName = "homeB" href="#home">Instantutor</a>
      // c1  <a classNameName='' = "signinB" href = "#signin" > Sign In </a>
      // c1  <a classNameName = "registerB" href = "#register"> Register </a>
      // c1  <a classNameName='' = "aboutB" href = "#about"> About </a>
      // c1 </div>  
    
    //   <nav>  
    //     <div className = "navigation" id = "topnav">
    //         <div className="logo-image">
    //             <img src="../Instantutor.jpg" alt="Logo" id = "toplogo">
    //         </div>
    //     </div>

    //         <div className = "navlinks" id = "toplinks">
    //             <a className = "homeB" href="#home">Instantutor</a>
    //             <a className = "signinB" href = "#signin" > Sign In </a>
    //             <a className = "registerB" href = "#register"> Register </a>
    //             <a className = "aboutB" href = "#about"> About </a>
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