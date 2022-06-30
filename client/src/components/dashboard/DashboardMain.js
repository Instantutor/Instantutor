import React, { Fragment, useEffect, useState, setState } from 'react'
//import { getRequestHistory, createRequest } from '../../actions/request'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import RequestItem from '../user-requests/UserRequestItem'
import UserRequest from '../dashboard/UserRequest'
import Dropdown from './Dropdown'

const DashboardMain = ({ user, req_history = [], loading = true, match }) => {
  const [showRequests, setShowRequests] = useState(true) //for dropdown menu
  //   const dropDown = () => {
  //     setShowRequests(!showRequests)
  //   }

  return (
    <div>
      <Link className='btn btn-primary' to='/make_request'>
        Make Request
      </Link>
      <Dropdown
        text={'Your Current Request'}
        state={showRequests}
        setState={setShowRequests}
      />

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
    </div>
  )
}

export default DashboardMain
