import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Alert from '../layout/Alert';

const NavbarRoute = ({
    privateR,
    ...props
}) => {
  return (
    <Fragment>
        <Navbar />
        <header id="head" className="secondary"></header>
        <section className="container">
          <Alert />
          {privateR ? <PrivateRoute {...props} /> : <Route {...props}/>}
        </section>
        <Footer />
    </Fragment>
  )
}

export default NavbarRoute