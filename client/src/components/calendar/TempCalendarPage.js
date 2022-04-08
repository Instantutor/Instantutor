import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCalendar, deleteCalendar, confirmCalendar } from '../../actions/calendar';
import Calendar from './Calendar';
import { GoogleLogin, GoogleLogout } from "react-google-login";

const TempCalendarPage = ({ created, confirmCalendar, createCalendar, deleteCalendar }) => {

    // creating calendar if not found
    // useEffect(async () => {
    //     await confirmCalendar();
    //     // !created && createCalendar();
    // }, []);

    // return (
    //     <>
    //         {!created ?
    //             <div>
    //                 <h1 className="large text-primary">Oops!</h1>
    //                 <h1 className="text-primary">
    //                     Looks like u did not create any calendar yet...
    //                 </h1>
    //                 <button
    //                     className="btn btn-primary"
    //                     onClick={() => createCalendar()}
    //                 >
    //                     Create Calendar
    //                 </button>
    //                 <Link to="/dashboard" className="btn btn-light">
    //                     Back to dashboard
    //                 </Link>
    //             </div> :
    //             <div>
    //                 <button
    //                     className="btn btn-danger"
    //                     onClick={() => deleteCalendar()}
    //                 >
    //                     Delete Calendar
    //                 </button>
    //                 <Link to="/dashboard" className="btn btn-light">
    //                     Back to dashboard
    //                 </Link>
    //                 <Calendar />
    //             </div>
    //         }
    //     </>
    // )


    const CLIENT_ID = '817226416342-kib0spf1jur26c07n2bpk08mk6ml1frn.apps.googleusercontent.com';

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        emailId: ""
    });

    // Success Handler
    const responseGoogleSuccess = (response) => {
        console.log();
        let userInfo = {
            name: response.profileObj.name,
            emailId: response.profileObj.email,
        };
        setUserInfo(userInfo);
        setIsLoggedIn(true);
    };

    const responseGoogleError = (response) => {
        console.log(response);
    };

    const logout = (response) => {
        console.log(response);
        let userInfo = {
          name: "",
          emailId: "",
        };
        setUserInfo(userInfo);
        setIsLoggedIn(false);
    };

    return (
        <div className="row mt-5">
          <div className="col-md-12">
            {isLoggedIn ? (
              <div>
                <h1>Welcome, {userInfo.name}</h1>
  
                <GoogleLogout
                  clientId={CLIENT_ID}
                  buttonText={"Logout"}
                  onLogoutSuccess={logout}
                ></GoogleLogout>
              </div>
            ) : (
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Sign In with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleError}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
              />
            )}
            {/* <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Sign In with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleError}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
              /> */}
          </div>
        </div>
      );
}

const mapStateToProps = (state) => ({
    created: state.calendar.created
});

export default connect(mapStateToProps, {
    confirmCalendar,
    createCalendar,
    deleteCalendar
})(TempCalendarPage)
