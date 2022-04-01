import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import "../../assetsNewjs/template.js" //from insta_index.html js libs
//<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
//<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
//import "../../assetsNewjs/headroom.min.js"
//import "../../assetsjs/jQuery.headroom.min.js"


const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated){
      return <Redirect to= '/dashboard' />;
    }

    return (

	<div className="navbar navbar-inverse navbar-fixed-top headroom" >
		<div className="container">
			<div className="navbar-header">

				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>

                <a className="navbar-brand" href="insta_index.html"><img src="assetsNew/images/Instantutor.png" style="width: 64px"> </img> Instantutor </a>
			</div>
			<div className="navbar-collapse collapse">
				<ul className="nav navbar-nav pull-right">
					<li className="active"><a href="#">Home</a></li>
					<li><a href="insta_about.html">About</a></li>
					<li><a href="insta_register.html">Register</a></li>
					<li><a className="btn" href="insta_signin.html">Sign In</a></li>
				</ul>
			</div>
		</div>
	</div> 



      //commented out original code
      //   <section className="landing">
      //   <div className="dark-overlay">
      //     <div className="landing-inner">
      //       <h1 className="x-large">Instantutor</h1>
      //       <p className="lead">
      //         Create an account to get help or to become a tutor
      //       </p>
      //       <div className="buttons">
      //         <Link to="/register" className="btn btn-primary">
      //           Sign Up
      //         </Link>
      //         <Link to="/login" className="btn btn-light">
      //           Login
      //         </Link>
      //       </div>
      //     </div>
      //   </div>
      // </section>


    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps) (Landing);
  