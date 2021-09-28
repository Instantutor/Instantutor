import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCalendar, deleteCalendar, confirmCalendar } from '../../actions/calendar';
import Calendar from './Calendar';

const TempCalendarPage = ({ created, confirmCalendar, createCalendar, deleteCalendar }) => {

    // creating calendar if not found
    useEffect(async () => {
        await confirmCalendar();
        // !created && createCalendar();
    }, []);

    return (
        <>
            {!created ?
                <div>
                    <h1 className="large text-primary">Oops!</h1>
                    <h1 className="text-primary">
                        Looks like u did not create any calendar yet...
                    </h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => createCalendar()}
                    >
                        Create Calendar
                    </button>
                    <Link to="/dashboard" className="btn btn-light">
                        Back to dashboard
                    </Link>
                </div> :
                <div>
                    <button
                        className="btn btn-danger"
                        onClick={() => deleteCalendar()}
                    >
                        Delete Calendar
                    </button>
                    <Link to="/dashboard" className="btn btn-light">
                        Back to dashboard
                    </Link>
                    <Calendar />
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    created: state.calendar.created
});

export default connect(mapStateToProps, {
    confirmCalendar,
    createCalendar,
    deleteCalendar
})(TempCalendarPage)
