import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';

const PreLoginRoutes = () => {
  return (
    <Fragment>
        <header id="head" className="secondary"></header>
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
            </Switch>
        </section>
    </Fragment>
  )
}

export default PreLoginRoutes