import React, { Fragment, useState } from 'react';
//import { sendEmail } from "../../../server/utils/email"
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { setAlert } from '../../actions/alert';
import { register} from '../../actions/auth';
import {sendLink} from '../../actions/auth';
import PropTypes from 'prop-types';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');

var url = "mongodb+srv://Adm:instutor@cluster0.s0gxd.mongodb.net/test?retryWrites=true&w=majority";


//const { email, password } = formData;

//const EmailSchema = new mongoose.schema({
  //email: {
    //type: String,
    //required: true,
  //},
//});

function enter_email({placeholder}){
  return(
    <div className="search">
      <div className="searchInputs">
        <input type="text"/>
        <div classname="searchIcons"></div>
      </div>
    </div>
  );
}

function Forgot() {
  const [formData, setFormData] = useState({
      email: '',
  });

  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (

    <div className="home">
      <div class="container">
        <h1 className="text-center mt-5">Forgot Password</h1>
          <div className="text-center mt-5">
            <button
              onClick={(e) =>{
                e.preventDefault();
                console.log("email sent to: " + email);
                //sendLink(email);
              }
                }>
            Send Reset Link
            </button >
          </div>
      </div>

      <form className="form">
          <div className="form-group">
              <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
              />
          </div>
          </form>
        </div>
  );
}

export default Forgot;
