import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
const config = require('config');
const db = config.db("mongoURI");
var url = "mongodb+srv://Adm:instutor@cluster0.s0gxd.mongodb.net/test?retryWrites=true&w=majority";



const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        //console.log("failed");
        console.error(err.message);
        console.log("err");
        // Exit process with failure

    }
};
function Forgot() {
  return (
    <div className="home">
      <div class="container">
        <h1 className="text-center mt-5">Forgot Password</h1>
          <div className="text-center mt-5">
            <button
              onClick={(e) =>{
                e.preventDefault();
                db.collection.find( { qty: { $gt: 4 } } );
              }
                }>
            Send Reset Link
            </button >
          </div>
      </div>
    </div>
  );
}

export default Forgot;
