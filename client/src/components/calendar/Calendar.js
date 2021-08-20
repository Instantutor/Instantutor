import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/calendar';
import { getCurrentProfile } from '../../actions/profile';
import CalendarEvent from './CalenderEvent';

const weekdays = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat"
];

const Calendar = ({
    getCurrentProfile,
    getEvents,
    availability,
    role
}) => {
    const currentDate = new Date();
    const currentWeekStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
    );
    const currentWeekEnd = new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 6
    );

    const [weekStart, setWeekStart] = useState(currentWeekStart);
    const [weekEnd, setWeekEnd] = useState(currentWeekEnd);
    const [tempEvent, setTempEvent] = useState(
        { _id: 1, target: 2, days: new Array(7).fill(false) }
    );
    const [createMode, setCreateMode] = useState(false);

    useEffect(() => {
        getCurrentProfile();
    }, []);

    useEffect(() => {
        getEvents(new Date(weekStart));
    }, [weekStart])

    const handleToday = () => {
        setWeekStart(currentWeekStart);
        setWeekEnd(currentWeekEnd);
        setCreateMode(false);
    }

    const handleNext = () => {
        setWeekStart(new Date(
            weekStart.getFullYear(),
            weekStart.getMonth(),
            weekStart.getDate() + 7
        ));
        setWeekEnd((new Date(
            weekEnd.getFullYear(),
            weekEnd.getMonth(),
            weekEnd.getDate() + 7
        )));
        setCreateMode(false);
    }

    const handlePrevious = () => {
        if (weekStart > currentWeekStart) {
            setWeekStart(new Date(
                weekStart.getFullYear(),
                weekStart.getMonth(),
                weekStart.getDate() - 7
            ));
            setWeekEnd((new Date(
                weekEnd.getFullYear(),
                weekEnd.getMonth(),
                weekEnd.getDate() - 7
            )));
        }
        setCreateMode(false);
    }

    const clickPanel = (day, timeSection) => {

        setTempEvent({
            _id: 1,
            target: 2,
            exceptions: [],
            days: tempEvent.days.map((elem, index) => index === day ? true : false),
            start_time: parseInt(timeSection / 2) * 100 + timeSection % 2 * 30,
            stop_time: parseInt(timeSection / 2) * 100 + timeSection % 2 * 30 + 
                (timeSection !== 47 ? 100 : 70) 
        });

        setCreateMode(true);
    }

    var days = [];
    for (let day = 0; day < 7; day++)
        days.push(new Date (
                weekStart.getFullYear(),
                weekStart.getMonth(),
                weekStart.getDate() + day
            ).getDate()
        );

    var timeSectionDivs = [];
    for (let timeSection = 0; timeSection < 48; timeSection++)
        for (let day = 0; day < 7; day++)
            timeSectionDivs.push(
                <div
                    key={"Section " + timeSection < 10 ? 
                        day.toString()+"0"+timeSection.toString() :
                        day.toString()+timeSection.toString()
                    }
                    style={{
                        gridColumnStart: day+2,
                        gridColumnEnd: day+3,
                        gridRowStart: timeSection*6+3,
                        gridRowEnd: timeSection*6+9,
                        borderWidth: timeSection % 2 === 1? "0px 1px 1px 0px" : "0px 1px 0px 0px",
                        borderStyle: "solid",
                        borderColor: "lightgray"
                    }}
                    onClick={() => clickPanel(day, timeSection)}
                />
            );

    var timeHeaderDivs = [
        <div
            key={"Hour 0"}
            style={{
                gridColumn: "1 / 2",
                gridRow: "2 / 3",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                borderWidth: "0px 1px 1px 0px",
                borderStyle: "solid",
                borderColor: "lightgray"
            }}
        />
    ];
    for (let i = 1; i < 25; i++)
        timeHeaderDivs.push(
            <div
                key={"Hour " + i.toString()}
                style={{
                    gridColumn: "1 / 2",
                    gridRowStart: (i-1)*12+3,
                    gridRowEnd: (i-1)*12+15,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    borderWidth: "0px 1px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "lightgray",
                    fontSize: "0.6em"
                }}
            >
                {i < 13 ? i : i === 24 ? 12 : i % 12}:00 {i < 12 || i === 24 ? "am" : "pm"}
            </div>
        );

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h1 className="week">
                    {weekStart.toDateString() + " - " + weekEnd.toDateString()}
                </h1>
                <div className="navigation">
                    <button className="btn btn-light" onClick={handleToday}>
                        Today
                    </button>
                    <button className="btn btn-light" onClick={handlePrevious}>
                        <i className="fas fa-arrow-left" />
                    </button>
                    <button className="btn btn-light" onClick={handleNext}>
                        <i className="fas fa-arrow-right" />
                    </button>
                </div>
            </div>

            {weekdays.map( (elem, index) =>
                index === 0 ?
                <div
                    className="weekday"
                    style={{gridColumnStart: "2"}}
                    key={"Day " + index.toString()}
                >
                    <h3>{weekStart.getDate()}</h3>
                    {elem}
                </div> :
                <div className="weekday" key={"Day " + index.toString()}>
                    <h3>{days[index]}</h3>
                    {elem}
                </div>
            )}

            {timeSectionDivs}

            {timeHeaderDivs}

            {availability.map( (elem, index) =>
                elem._id !== tempEvent._id ?
                <CalendarEvent
                    event={availability[index]}
                    weekStart={weekStart}
                    setCreateMode={setCreateMode}
                    setTempEvent={setTempEvent}
                /> :
                null
            )}

            <CalendarEvent
                event={tempEvent}
                weekStart={weekStart}
                role={role}
                createMode={createMode}
                editMode={
                    availability.length > 0 
                    && availability.find(elem => elem._id === tempEvent._id) ? true : false
                }
                setCreateMode={setCreateMode}
                setTempEvent={setTempEvent}
            />

        </div>
    )
}

const mapStateToProps = state => ({
    availability: state.calendar.availability,
    role: state.profile.profile ? state.profile.profile.role : null
});

export default connect(mapStateToProps, {getEvents, getCurrentProfile})(Calendar)
