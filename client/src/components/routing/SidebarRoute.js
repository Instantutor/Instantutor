import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Sidebar from '../layout/Sidebar';
import Alert from '../layout/Alert';

const SidebarRoute = ({
    privateR,
    ...props
}) => {
  return (
    <Fragment>
      <div className='wrapper'>
        <Sidebar />
        <div className="main-panel ps-container ps-theme-default ps-active-x ps-active-y">
            <Alert />
            {privateR ? <PrivateRoute {...props} /> : <Route {...props}/>}
        </div>
      </div>
    </Fragment>
  )
}

export default SidebarRoute;