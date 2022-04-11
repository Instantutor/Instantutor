import React from 'react';
import { Link, Redirect } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">

        <div className="footer1">
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-3 widget">
                        <h3 className="widget-title">Contact</h3>
                        <div className="widget-body">
                            <p>
                                <a href="mailto:#">instantutor.webservices@gmail.com</a><br />
                            </p>	
                        </div>
                    </div>

                    <div className="col-md-3 widget">
                        <h3 className="widget-title">Github</h3>
                        <div className="widget-body">
                            <p className="follow-me-icons">
                                {/* <a href=""><i className="fa fa-twitter fa-2"></i></a>
                                <a href=""><i className="fa fa-dribbble fa-2"></i></a> */}
                                <a href="https://github.com/Instantutor/Instantutor"><i className="fa fa-github fa-2"></i></a>
                                {/* <a href=""><i className="fa fa-facebook fa-2"></i></a> */}
                            </p>	
                        </div>
                    </div>

                    <div className="col-md-6 widget">
                        <h3 className="widget-title"></h3>
                        <div className="widget-body">
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div className="footer2">
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-6 widget">
                        <div className="widget-body">
                            <p className="simplenav">
                                <Link to="/">Home</Link> | 
                                {/* <Link to="insta_about.html">About</Link> | */}
                                <b><Link to="/register">Register</Link></b>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </footer>
  )
}

export default Footer