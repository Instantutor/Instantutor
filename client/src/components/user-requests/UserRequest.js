import React, { useState, useEffect, Fragment } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import formData from "../profile-forms/ProfileForm";
import { createRequest, editRequest, getRequestHistory } from "../../actions/request";
import "../../App.css";
import * as courses from "../../course_list.json"

const UserRequest = ({ createRequest,
  editRequest,
  getRequestHistory,
  requests: {request_history, loading},
  user,
  history,
  match }) => {
  const [requestData, setRequestData] = useState({
    request: "",
    subject: "",
    course: "",
    grade: "",
    topic: "",
    help_time: "",
    availability: [],
    number_sessions: "",
  });
  const requestID = match.params.id;

  const {
    request,
    subject,
    course,
    grade,
    topic,
    help_time,
    availability,
    number_sessions,
  } = requestData;

  useEffect(async () => {
    if (requestID && user) {
      if (request_history.length === 0)
        await getRequestHistory(user._id).then(console.log("success: ", request_history));

      let request = request_history.find(req => req._id === requestID);
      let oldRequestData = { ...requestData };

      for (const prop in requestData)
        if (request && request[prop])
          oldRequestData[prop] = request[prop];
      
      setRequestData(oldRequestData);
    }
  }, [getRequestHistory, user, loading]);

  const onChange = (e) =>
    setRequestData({ ...requestData, [e.target.name]: e.target.value });

  const setAvailability = (e) => {
    if (e.target.checked)
      setRequestData({
        ...requestData,
        availability: availability.concat(e.target.name),
      });
    else
      setRequestData({
        ...requestData,
        availability: availability.filter(elem => elem !== e.target.name),
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (requestID)
      await editRequest(requestData, requestID);
    else
      await createRequest(requestData, history);
  };

  // Generating the checkbox
  const day_names = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const day_times = ["morning", "evening", "night"];
  const day_headers = day_names.map((name) => <th key = {name}>{name}</th>);
  const checkbox = day_times.map((time) => (
    <tr key = {time}>
      <th>{time}</th>
      {day_names.map((day) => (
        availability && availability.find(period => period === day + " " + time) ?
        <td key = {day}>
          <input
            className="checkbox"
            name={day + " " + time}
            type="checkbox"
            checked={true}
            onChange={setAvailability}
          />
        </td> :
        <td key = {day}>
          <input
            className="checkbox"
            name={day + " " + time}
            type="checkbox"
            checked={false}
            onChange={setAvailability}
        />
        </td>
      ))}
    </tr>
  ));

  return (
    <>
      {(formData.role === "Student" || "Both") && (
        <Fragment>
          <h1 className="large text-primary">Open a Request!</h1>
          <small>* = required field</small>

          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="* What do you need help with?"
                name="request"
                value={request}
                onChange={onChange}
              />
              <small className="form-text">
                Give us some details about what you're looking for.
              </small>
            </div>

            <div className="form-group">
              <select name="subject" value={subject} onChange={onChange}>
              <option value="">What subject do you need help with?</option>
                {courses.subject_list.map(subj => <option value={subj}>{subj}</option>)}
              </select>
              <small className="form-text">
                What subject do you need help with eg. Math, Biology, English,
                ...?
              </small>
            </div>

            <div className="form-group">
              <select name="course" value={course} onChange={onChange}>
              <option value="">What course do you need help with?</option>
                {subject in courses.course_list
                  ? courses.course_list[subject].map(course => <option value={course}>{course}</option>)
                  : null
                }
              </select>
              <small className="form-text">
                What course do you need help with eg. Data Structures, Organic Chemistry, Linear Algebra
                ...?
              </small>
            </div>

            <div className="form-group">
              <select name="grade" value={grade} onChange={onChange}>
                <option>What is the level of this problem?</option>
                <option value="None">Don't know</option>
                <option value="K-12">K-12</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="PHD">PHD</option>
              </select>
              <small className="form-text">
                What is the academic difficulty of your request?
              </small>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Topic"
                name="topic"
                value={topic}
                onChange={onChange}
              />
              <small className="form-text">
                What is the specific topic you need help with?
              </small>
            </div>

            <div className="form-group">
              <select name="help_time" value={help_time} onChange={onChange}>
                <option>When do you need help?</option>
                <option value="ASAP">As soon as possibile</option>
                <option value="Today">Today</option>
                <option value="Week">This week</option>
                <option value="Month">Within the month</option>
              </select>
              <small className="form-text">
                Approximately how quickly do you need help?
              </small>
            </div>

            <div className="form-group">
              <table className="timepicker">
                <tbody>
                  <tr>
                    <th>&nbsp;</th>
                    {day_headers}
                  </tr>
                  {checkbox}
                </tbody>
              </table>
              <small className="form-text">
                When are you generally available?
              </small>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="How many sessions do you want help with?"
                name="number_sessions"
                value={number_sessions}
                onChange={onChange}
              />
              <small className="form-text">
                Enter the number of sessions you need help with eg: 1, 3, 5 ...
              </small>
            </div>

            <input type="submit" className="btn btn-primary my-1" />
          </form>

          <button 
              onClick = {() => history.goBack()} 
              className = 'btn btn-dark'>Go Back
          </button>

        </Fragment>
      )}
    </>
  );
};

UserRequest.propTypes = {
  createRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  requests: state.user_requests
});

export default connect(mapStateToProps, {createRequest, editRequest, getRequestHistory})(UserRequest);
