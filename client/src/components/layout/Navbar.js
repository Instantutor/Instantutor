import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Instantutor from '../../assets/images/Instantutor.png'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <ul className="nav navbar-nav pull-right">
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
    <ul className="nav navbar-nav pull-right">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link className="btn" to="/login">Sign in</Link>
        </li>
      </ul>
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
      <div className="navbar navbar-inverse navbar-fixed-top headroom animated slideDown">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span> <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
                      <Link className="navbar-brand" to="/">
                        <img src={Instantutor} style={{width: 64}} /> Instantutor</Link>
            </div>
            <div className="navbar-collapse collapse">
              {/* <ul className="nav navbar-nav pull-right">
                <li className="active"><a href="#">Home</a></li>
                <li><a href="insta_about.html">About</a></li>
                <li><a href="insta_register.html">Register</a></li>
                <li><a className="btn" href="insta_signin.html">Sign In</a></li>
              </ul> */}
              { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}
            </div>
          </div>
        </div>





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