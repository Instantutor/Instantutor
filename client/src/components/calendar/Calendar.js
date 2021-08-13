import React, { useState } from 'react';
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

// Sample event with current model
const testEvents = [
    {
        days: [
            true,
            false,
            false,
            true,
            true,
            false,
            false
        ],
        exceptions: [
            "2021-08-09T00:00:00.000Z",
            "2021-08-13T00:00:00.000Z",
        ],
        _id: "61117dcf1f2bc907586b35da",
        target: 0,
        start_time: 1000,
        stop_time: 1030,
        start_date: "2021-08-04T00:00:00.000Z",
        stop_date: "2021-08-16T00:00:00.000Z"
    },
    {
        days: [
            true,
            false,
            false,
            true,
            true,
            false,
            false
        ],
        exceptions: [
            "2021-08-12T00:00:00.000Z"
        ],
        _id: "61117dcf1f2bc907586b35db",
        target: 1,
        start_time: 1155,
        stop_time: 1230,
        start_date: "2021-08-04T00:00:00.000Z",
        stop_date: "2021-08-16T00:00:00.000Z"
    }
];

const Calendar = () => {
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
    const [editModes, setEditModes] = useState(testEvents.map(elem => {
            return { 
                id: elem._id,
                edit: false
        }}));
    const [newEvent, setNewEvent] = useState({ _id: 1, target: 2, days: new Array(7).fill(false) });
    const [createMode, setCreateMode] = useState(false);

    /*
    Add a use effect to edit the edit array on api get call
    */

    const handleToday = () => {
        setWeekStart(currentWeekStart);
        setWeekEnd(currentWeekEnd);
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
    }

    /* edge case what happens if you click at 23:30 */
    const clickPanel = (day, timeSection) => {
        setEditModes(editModes.map(elem => { return { id: elem.id, edit: false } }));

        setNewEvent({
            ...newEvent,
            days: newEvent.days.map((elem, index) => index === day ? true : false),
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
                    onClick={(event) => clickPanel(day, timeSection)}
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
                {i < 13 ? i : i %12}:00 {i < 12 || i === 24 ? "am" : "pm"}
            </div>
        );

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h1 className="week">
                    {weekStart.toDateString() + " - " + weekEnd.toDateString()}
                </h1>
                <div className="navigation">
                    <button className="btn" onClick={handleToday}>
                        Today
                    </button>
                    <button className="btn" onClick={handlePrevious}>
                        <i className="fas fa-arrow-left" />
                    </button>
                    <button className="btn" onClick={handleNext}>
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

            {testEvents.map( (elem, index) => 
                <CalendarEvent
                    event={testEvents[index]}
                    weekStart={weekStart}
                    editMode={editModes[index]}
                    editModes={editModes}
                    setEditModes={setEditModes}
                    setCreateMode={setCreateMode}
                />
            )}

            <CalendarEvent
                event={newEvent}
                weekStart={weekStart}
                createMode={createMode}
                setCreateMode={setCreateMode}
            />

        </div>
    )
}

export default Calendar
