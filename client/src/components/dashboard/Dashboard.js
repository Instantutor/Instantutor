import React, { Fragment, useEffect, useState, setState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getRequestHistory, createRequest } from '../../actions/request'
import RequestItem from '../user-requests/UserRequestItem'
import UserRequest from '../user-requests/UserRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import DashboardMain from './DashboardMain'

const DashBoard = ({
  getRequestHistory,
  user,
  req_history = [],
  loading = true,
  match,
}) => {
  useEffect(async () => {
    ;(await user) && getRequestHistory(user._id)
  }, [getRequestHistory, match.params.id, user])

  useEffect(async () => {
    setCreateRequest(match.path != '/dashboard')
  }, [match.path])

  const [createRequest, setCreateRequest] = useState(match.path != '/dashboard')


  //console.log(match)
  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>

      {createRequest ? (
        <UserRequest match={match} setCreateRequest={setCreateRequest} />
      ) : (
        <DashboardMain
          user={user}
          req_history={req_history}
          loading={loading}
          match={match}
          //dropCreateRequest={dropCreateRequest}
        />
      )}
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
  user_requests: state.user_requests,
})

export default connect(mapStateToProps, { getRequestHistory })(DashBoard)
