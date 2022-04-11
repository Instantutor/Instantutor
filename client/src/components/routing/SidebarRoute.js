import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const SidebarRoute = ({
    privateR,
    ...props
}) => {
  return (
    <Fragment>
        <section className="container">
            {privateR ? <PrivateRoute {...props} /> : <Route {...props}/>}
        </section>
    </Fragment>
  )
}

export default SidebarRoute