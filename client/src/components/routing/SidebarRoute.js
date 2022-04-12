import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PrivateRoute from './PrivateRoute';
import '../../assets/css/dashboard.css';

const SidebarRoute = ({
    logout,
    privateR,
    ...props
}) => {
  return (
    <Fragment>
      <div className='wrapper'>
        <div className="sidebar" data-color="black" style={{padding: 0}}>
            <div className="logo">  
                <a href="#" className="simple-text logo-mini">
                    <img src={require('../../assets/Instantutor Icons/Instantutor.png')} />
                </a>
                <a href="#" className="simple-text logo-normal">
                    Instantutor
                </a>
            </div>
            <div className="sidebar-wrapper ps-container ps-theme-default">
                <ul className="nav">
                    <li className="active">
                        <Link to="/dashboard">
                            <i>
                              <img src={require('../../assets/Instantutor Icons/Dashboard_Orange.png')}  />
                            </i>
                            <p className="sidebar_font">Dashboard</p>
                        </Link>
                    </li>

                    {/* <li>
                        <Link to="/calendar">
                            <i>
                              <img src={require('../../assets/Instantutor Icons/Calander_Black.png')} />
                            </i>
                            <p className="sidebar_font">Calender</p>
                        </Link>
                    </li> */}

                    <li>
                        <Link to="/edit_profile">
                            <i>
                              <img src={require('../../assets/Instantutor Icons/Portfolio Black.jpg')}
                              style={{"marginLeft": "13px"}} />
                            </i>
                            <p className="sidebar_font">Your Profile</p>
                        </Link>
                    </li>

                    <li>
                        <Link to="/requests" style={{"maxWidth": "80%"}}>
                            <i>
                              <img src={require('../../assets/Instantutor Icons/History_Black.png')}
                              style={{"marginLeft": "11px"}} />
                            </i>
                            <p className="sidebar_font">Request History</p>
                        </Link>
                    </li>

                    <li>
                        <Link to="/peer_request">
                            <i>
                              <img src={require('../../assets/Instantutor Icons/Browse Black_ccexpress.png')} />
                            </i>
                            <p className="sidebar_font">Browse Requests</p>
                        </Link>
                    </li>

                    {/* <li>
                        <a href="../examples/contact.html">
                            <i>
                              <img src={require('../../assets/Instantutor Icons/Contact_Black.png')} />
                            </i>
                            <p className="sidebar_font">Contact Us</p>
                        </a>
                    </li> */}

                    {/* <li>
                        <a href="../examples/settings.html">
                            <i>
                              <img src={require('../../assets/Instantutor Icons/Settings_Black.png')}
                              style={{"marginLeft": "5px", "maxWidth": "130%"}} />
                            </i>
                            <p className="sidebar_font">Settings</p>
                        </a>
                    </li> */}

                    <li>
                        <a onClick={logout} href="#!">
                            <i> <img src={require('../../assets/Instantutor Icons/Logout_Black.png')}
                            style={{"marginLeft": "17px"}} /> </i>
                            <p className="sidebar_font">Log out</p>
                        </a>
                    </li>

                </ul>
            {/* <div className="ps-scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}>
              <div className="ps-scrollbar-x" tabIndex="0" style={{"left": "0px", "width": "0px"}}>
              </div>
            </div> */}
            {/* <div className="ps-scrollbar-y-rail" style={{"top": "0px", "height": "477px", "right": "0px"}}>
              <div className="ps-scrollbar-y" tabIndex="0" style={{"top": "0px", "height": "385px"}}>
              </div></div> */}
            </div>
        </div>
        <div className="main-panel ps-container ps-theme-default ps-active-x ps-active-y">
            {privateR ? <PrivateRoute {...props} /> : <Route {...props}/>}
        </div>
      </div>
      {/* <div className='sidebar-parent'>
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
      </div> */}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { logout })(SidebarRoute);