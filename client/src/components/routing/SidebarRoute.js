import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PrivateRoute from './PrivateRoute';
import Instantutor from '../../assets/images/Instantutor.png'

const SidebarRoute = ({
    logout,
    privateR,
    ...props
}) => {
  return (
    <Fragment>
      <div className='sidebar-parent'>
        <div className='sidebar'>
          <h3> <img src={Instantutor} style={{width: 36}} /> Instantutor</h3>
          <ul className='list-unstyled'>
            <li>
              <Link className='btn btn-sidebar' to="/dashboard">
              <i className="fas fa-sign-out-alt"></i>{' '}
              <span className="hide-sm">Dashboard</span></Link>
            </li>
            <li>
              <Link className='btn btn-sidebar' to="/requests">
                <i className="fas fa-share-square"></i> Your requests
              </Link>
            </li>
            <li>
              <Link to="/edit_profile" className="btn btn-sidebar"
              ><i className="fas fa-user-circle"></i> Edit Profile </Link>
            </li>
            <li>
              <Link to="/add_expertise" className="btn btn-sidebar"
              ><i className="fas fa-user-graduate"></i> Add Expertise </Link>
            </li>
            <li>
              <Link to="/peer_request" className="btn btn-sidebar"
              ><i className="fas fa-inbox"></i> Request History </Link>
            </li>
            <li>
              <a  onClick={logout} className='btn btn-sidebar' href="#!">
                <i className="fas fa-sign-out-alt"></i>{' '}
                <span className="hide-sm">Logout</span>
              </a>
            </li>
          </ul>
        </div>
        <section className="container">
            {privateR ? <PrivateRoute {...props} /> : <Route {...props}/>}
        </section>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { logout })(SidebarRoute);