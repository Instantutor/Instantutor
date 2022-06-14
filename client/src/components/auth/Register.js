import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom"; 
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'; 

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        password2: '',
    });

    const { name, email, role, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('passwords do not match', 'danger');
        }
        else {
            register({ name, email, role, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <div className="container">
            
            <div className="row">

                <article className="col-xs-12 maincontent">
                    <h6></h6>
                    <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h5 className="thin text-center">Create a new account</h5>
                                <form>
                                    <div className="top-margin">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={name}
                                            onChange={e => onChange(e)}
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="top-margin">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            name="email"
                                            value={email}
                                            onChange={e => onChange(e)}
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="top-margin">
                                        <label>Password </label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={e => onChange(e)}
                                            minLength="6"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="top-margin">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="password2"
                                            value={password2}
                                            onChange={e => onChange(e)}
                                            minLength="6"
                                            className="form-control"
                                        />
                                    </div>

                                    <div>
                                        <Link to="/login" style={{"marginLeft": "365px"}}> Existing User?</Link>
                                    </div>	
                                    <div className="text-center">
                                        <button className="btn btn-action" type="submit" onClick={onSubmit}>Register</button>
                                    </div>
                                    </form></div>
                                
                            </div>
                        </div>

                    </article></div>

            </div>

            {/* <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                </small>
                </div>
                
                <div className="form-group">
                <label htmlFor="role">Please choose a role:</label>
                <select id="role" name="role" onChange={e => onChange(e)}>
                    <option defaultValue="" selected={true} disabled={true}></option>
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="both">Both</option>
                </select>
                </div>
               
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength="6" />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p> */}

        </Fragment>);
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);


