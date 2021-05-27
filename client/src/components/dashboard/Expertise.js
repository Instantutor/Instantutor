import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {deleteExpertise} from '../../actions/profile';

const Expertise = ({ expertise, deleteExpertise }) => {
    const expertises = expertise.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.area}</td>
            <td className="hide-sm">{exp.relatedCourses.map((course) => (
                course + '; '
            ))}</td>
            <td className="hide-sm">{exp.description}</td>

            <td>
                <button 
                    onClick = {()=>deleteExpertise(exp.id)} 
                    className = 'btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));
    
    // Check the existance of expertise and show it in table.
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>

            {JSON.stringify(expertise) !== '[]' ? (
                <Fragment>
                    <table className="table">
                    <thead>
                        <tr>
                            <th>Area</th>
                            <th className="hide-sm">Courses</th>
                            <th>Desc</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{expertises}</tbody>
                    </table>
                </Fragment>
            ) : (
                <Fragment>
                    <p> You have not yet setup any expertise, adding some info to be a tutor</p>
                </Fragment>
            )} 
        </Fragment>
    );
};

Expertise.propTypes = {
    expertise: PropTypes.array.isRequired,
    deleteExpertise: PropTypes.func.isRequired
}

export default connect(null, {deleteExpertise})(Expertise);
