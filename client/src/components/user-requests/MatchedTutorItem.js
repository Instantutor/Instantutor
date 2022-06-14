import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { disperseToTutors, disperseToTutorFinal } from "../../actions/request";
import { connect } from "react-redux";

const defaultConfirm = {
  backgroundColor: "#f2f2f2",
  color: "black",
};
const clickedConfirm = {
  backgroundColor: "#17a2b8",
  color: "white",
};

class MatchedTutorItem extends React.Component {
  isConfirmed = () => this.state.clicked;
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: this.props.confirmed ? clickedConfirm : defaultConfirm,
      clicked: this.props.confirmed,
      RequestState: this.props.item.state,
      loading: this.props.loading,
    };
  }
  render() {
    console.log("LOADING:", this.state.loading);
    const finalize_callback = (tutorItem) => {
      this.props.finalize_callback(tutorItem);
    };
    const disperseToTutors = (
      tutor_choice,
      tutor_username,
      request_id,
      callback
    ) => {
      this.props.disperseToTutors(
        tutor_choice,
        tutor_username,
        request_id,
        callback
      );
    };
    const disperseToTutorFinal = (
      tutor_choice,
      tutor_username,
      request_id,
      callback
    ) => {
      this.props.disperseToTutorFinal(
        tutor_choice,
        tutor_username,
        request_id,
        callback
      );
    };
    const setRequestState = (new_request_state) => {
      this.setState({ RequestState: new_request_state });
    };
    const req_id = this.props.request_id;
    const tutor = this.props;
    let { name, _id, avatar, bio } = tutor.item;
    return (
      <div className="profile bg-white p-2">
        <img src={avatar} alt="" className="round-img" />
        <div>
          <h2>{name}</h2>
          {bio && (
            <p>
              <i className="far fa-address-card"> {" " + bio} </i>
            </p>
          )}
        </div>

        <Link
          to={`/profile/${_id}`}
          className="btn btn-primary"
        >
          <i className="fas fa-user-circle"> </i> View Profile
        </Link>

        <Fragment>
          {this.state.RequestState === "UNSEND" ? (
            <button
              className="btn-confirm"
              onClick={function () {
                var tutor_choice = {};
                tutor_choice[_id] = true;
                disperseToTutors(tutor_choice, name, req_id, setRequestState);
              }}
            >
              Send request
            </button>
          ) : this.state.RequestState != "SELECTED" ? (
            <div>
              <i> The tutor's feedback: </i>
              <i className="text-primary"> {this.state.RequestState} </i>
            </div>
          ) : (
            <div></div>
          )}

          {this.state.RequestState === "ACCEPT" && (
            <button
              onClick={function () {
                disperseToTutorFinal(_id, name, req_id, setRequestState);
                //call matched tutor's page callback
                finalize_callback(tutor.item);
              }}
              className="btn btn-success"
            >
              Proceed to Instruction with <b>{name}</b>
            </button>
          )}
          {this.state.RequestState === "SELECTED" && (
            <i className="text-primary">SELECTED</i>
          )}
        </Fragment>
      </div>
    );
  }
}

MatchedTutorItem.propTypes = {
  tutor: PropTypes.object,
  disperseToTutorFinal: PropTypes.func.isRequired,
  disperseToTutors: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  loading: state.peer_requests.loading,
});

export default connect(mapStateToProps, {
  disperseToTutors,
  disperseToTutorFinal,
})(MatchedTutorItem);
