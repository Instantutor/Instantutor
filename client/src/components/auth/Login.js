import React, { Fragment, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };
    // Redirect of logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>

            <div className="container">

            <div className="row">

                <article className="col-xs-12 maincontent">
                    <h6></h6>
                    <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                        <div className="panel panel-other">
                            <div className="panel-body">
                                <h5 className="thin text-center" style={{"marginTop": "50px", "marginBottom": "30px"}}>
                                    Sign in to Instantutor</h5>
                                <form onSubmit={onSubmit}>
                                    <div className="top-margin">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            name="email"
                                            value={email}
                                            onChange={e => onChange(e)}
                                            required
                                            className="form-control"
                                            style={{"marginBottom": "30px"}}
                                        />
                                    </div>

                                    <div className="top-margin">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={e => onChange(e)}
                                            required
                                            minLength="6"
                                            className="form-control"
                                        />
                                    </div>

                                    <div>
                                        {/* <a href="insta_forgotpass.html" style={{"margin-left": "75px"}}>Forgot Password? </a> */}
                                        <Link to="/register" style={{"marginLeft": "75px"}}>New User?</Link>
                                    </div>

                                    <div className="text-center" style={{"marginTop": "20px"}}>
                                            <button className="btn btn-action" type="submit" value="Login">Sign In</button>
                                        </div>
                                    </form></div>
                                
                            </div>
                        </div>

                    </article></div>
                    

            </div>
            {/* <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign Into Your Account
        </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p> */}
        </Fragment>);
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);