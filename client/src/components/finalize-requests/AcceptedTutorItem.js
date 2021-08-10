import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
      currentStyle: defaultConfirm,
      clicked: false,
    };
  }
  render() {
    const tutor = this.props;
    const confirmButtonClicked = () => {
      const newStyle =
        this.state.currentStyle === defaultConfirm
          ? clickedConfirm
          : defaultConfirm;
      this.setState({ currentStyle: newStyle });
      this.setState({ clicked: !this.state.clicked });
      //dispatch to add tutor to list of tutors to confirm for user
    };

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
          target="_blank"
          className="btn btn-primary"
        >
          <i className="fas fa-user-circle"> </i> View Profile
        </Link>
        <button
          className="btn-confirm"
          style={this.state.currentStyle}
          onClick={confirmButtonClicked}
        >
          {this.state.clicked ? "Deselect Tutor" : "Select Tutor"}
        </button>
      </div>
    );
  }
}

MatchedTutorItem.propTypes = {
  tutor: PropTypes.object,
};

export default MatchedTutorItem;
