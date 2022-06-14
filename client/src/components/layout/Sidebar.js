import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Sidebar = ({selected, logout, profile : {profile}, auth}) => {

  return (
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
            <li className={selected === "dashboard" ? "active" : ""}>
                <Link to="/dashboard">
                    <i>
                      <img src={selected === "dashboard"
                        ? require('../../assets/Instantutor Icons/Dashboard_Orange.png')
                        : require('../../assets/Instantutor Icons/Dashboard Black.png')}  />
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

            <li className={selected === "profile" ? "active" : ""}>
                <Link to={profile && auth.user ? `/profile/${ auth.user._id }` : "/create_profile"}>
                    <i>
                      <img src={selected === "profile"
                        ? require('../../assets/Instantutor Icons/Portfolio Orange.png')
                        : require('../../assets/Instantutor Icons/Portfolio Black_ccexpress.png')}
                      style={{"marginLeft": "13px"}} />
                    </i>
                    <p className="sidebar_font">Your Profile</p>
                </Link>
            </li>

            {profile && <li className={selected === "history" ? "active" : ""}>
                <Link to="/request_history" >
                    <i>
                      <img src={selected === "history"
                        ? require('../../assets/Instantutor Icons/History Orange.png')
                        : require('../../assets/Instantutor Icons/History_Black.png')}
                      style={{"marginLeft": "11px"}} />
                    </i>
                    <p className="sidebar_font">Request History</p>
                </Link>
            </li> }

            {profile && <li className={selected === "browse" ? "active" : ""}>
                <Link to="/peer_request">
                    <i>
                      <img src={selected === "browse"
                        ? require('../../assets/Instantutor Icons/Browe Orange.jpg')
                        : require('../../assets/Instantutor Icons/Browse Black_ccexpress.png')} />
                    </i>
                    <p className="sidebar_font">Browse Requests</p>
                </Link>
            </li> }

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
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Sidebar);