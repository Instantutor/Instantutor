import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated){
      return <Redirect to= '/dashboard' />;
    }

    return (
        <section className="landing">
        <header id="head">
        <div className="container">
			      <div className="row">
			      	<h1 className="lead">Instantutor</h1>
			      	<p className="tagline">Get help or become a tutor!</p>
				      <p><Link className="btn btn-default btn-lg" role="button" to="/register">REGISTER</Link> 
				      <Link className="btn btn-action btn-lg" role="button" to="/login">SIGN IN</Link></p>
			      </div>
		    </div>
{/*         
        
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Instantutor</h1>
            <p className="lead">
              Create an account to get help or to become a tutor
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div> */}
        </header>
      </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps) (Landing);
  