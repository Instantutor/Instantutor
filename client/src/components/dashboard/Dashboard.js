import React, { Fragment, useEffect, useState,setState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getRequestHistory, createRequest } from '../../actions/request'
import RequestItem from '../user-requests/UserRequestItem'
import UserRequest from '../dashboard/UserRequest'



const DashBoard = ({
  getRequestHistory,
  user,
  req_history = [],
  loading = true,
  match,
  //showRequests, //show the drop down
  
}) => {
  const [showRequests, setShowRequests] = useState(true) //for dropdown menu 
  const dropDown = ()=>{setShowRequests(!showRequests)}
  const [buttonText, setButtonText] = useState(true) //change button text
  const changeText = ()=>{setButtonText(!buttonText)}
  
  useEffect(async () => {
    /*await (match.params.id ? 
            getRequestHistory(match.params.id) : 
            (user &&
            getRequestHistory(user._id)));*/
    ;(await user) && getRequestHistory(user._id)
  }, [getRequestHistory, match.params.id, user]);
  
  return (
    <Fragment>
      <h1 className='large text-primary'>DashBoard</h1>

      <button
        className='btn btn-primary'
        onClick={() => {
          dropDown()
          changeText()
        }}
      >
        {buttonText ? 'Close Requests' : 'Expand Requests'}
      </button>
      <Link
        to={`/make_request`}
        className='btn btn-info'
      >
        Create Request
      </Link>
      {showRequests ? (
        loading ? (
          <Spinner />
        ) : req_history === null ||
          req_history === undefined ||
          req_history.length < 1 ? (
          <div>
            <h1 className='large text-primary'>Oops!</h1>
            <h1 className='text-primary'>
              Looks like u did not post any requests yet...
            </h1>
          </div>
        ) : (
          <div className='request '>
            {req_history.map((request) => (
              <RequestItem key={request._id} item={request} />
            ))}
          </div>
        )
      ) : null}

      {/* <Link to="/dashboard" className="btn btn-light">
                Back to dashboard
                        </Link> */}

      {/* <Link to="/make_request" className="btn btn-light">
                Make a Request
            </Link> */}
    </Fragment>
  )
}

DashBoard.propTypes = {
  getRequestHistory: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  req_history: state.user_requests.request_history,
  loading: state.user_requests.loading,
  user_requests:state.user_requests,
})

export default connect(mapStateToProps, { getRequestHistory })(DashBoard)
