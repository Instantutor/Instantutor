import React, { Fragment, useEffect, useState, setState } from 'react'
//import { getRequestHistory, createRequest } from '../../actions/request'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import RequestItem from '../user-requests/UserRequestItem'
import UserRequest from '../dashboard/UserRequest'

const DashboardMain = ({ user, req_history = [], loading = true, match, dropCreateRequest }) => {
  const [showRequests, setShowRequests] = useState(true) //for dropdown menu
  const dropDown = () => {
    setShowRequests(!showRequests)
  }
  const [buttonText, setButtonText] = useState(true) //change button text
  const changeText = () => {
    setButtonText(!buttonText)
  }

  return (
    <div>
      <h3
        //className='btn btn-primary'
        onClick={() => {
          dropDown()
          changeText()
        }}
      >
        {buttonText ? 'Close Requests' : 'Expand Requests'}
      </h3>
      <button className='btn btn-primary' onClick={() => dropCreateRequest()}>
        Make Request
      </button>
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
