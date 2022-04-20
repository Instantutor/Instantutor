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
        <Alert />
        <header id="head" class="secondary"></header>
        <section className="container">
            {privateR ? <PrivateRoute {...props} /> : <Route {...props}/>}
        </section>
        <Footer />
    </Fragment>
  )
}

export default NavbarRoute