import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {deleteExpertise} from '../../actions/profile';

//import Moment from 'react-moment';

const Expertise = ({ expertise, deleteExpertise }) => {
    const expertises = expertise.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.area}</td>
            <td className="hide-sm">{exp.degree}</td>
            <td className="hide-sm">{exp.relatedCourses.map((course) => (
                course + '; '
            ))}</td>

            <td className="hide-sm">{exp.description}</td>
            <td>
                <Link to={`/edit_expertise/${exp._id}`} className='btn btn-primary'>
                    Edit
                </Link>
            </td>

            <td>
                <button 
                    onClick = {()=>deleteExpertise(exp._id)} 
                    className = 'btn btn-danger'>Delete
                </button>
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
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Courses</th>
                            <th>Desc</th>
                            <th>Operations</th>
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
