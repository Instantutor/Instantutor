import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';
import Landing from '../layout/Landing';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const LandingRoute = ({
    privateR,
    ...props
}) => {
  return (
    <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Footer />
    </Fragment>
  )
}

export default LandingRoute