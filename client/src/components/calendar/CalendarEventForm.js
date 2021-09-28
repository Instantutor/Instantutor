import React, {useState} from 'react';
import { connect } from 'react-redux';
import { createEvent, editEvent, deleteEvent } from '../../actions/calendar';

const Hours = new Array(12).fill(0).map((elem, index) => (index + 1).toString());
const Minutes = new Array(12).fill(0).map((elem, index) => 
    index < 2 ? "0" + (index * 5).toString() : (index * 5).toString()
);
const Roles = {"Both": 2, "Student": 1, "Tutor": 0};

const CalendarEventForm = ({
    event,
    role,
    editMode,
    gridRowStart,
    firstEvent,
    setTempEvent,
    closeTempEvent,
    createEvent,
    editEvent,
    deleteEvent
}) => {

    const gridColumnStart = firstEvent < 3 ? firstEvent + 3 : firstEvent - 1;

    const startHour = event.start_time < 100 ? 12 :
        event.start_time <= 1300 ? parseInt(event.start_time / 100) :
        parseInt((event.start_time - 1200) / 100);
    const stopHour = event.stop_time < 100 ? 12 :
        event.stop_time <= 1300 ? parseInt(event.stop_time / 100) :
        parseInt((event.stop_time - 1200) / 100);
    const startMinute = (event.start_time%100 > 5 ? "" : "0") + (event.start_time%100).toString();
    const stopMinute = (event.stop_time%100 > 5 ? "" : "0") + (event.stop_time%100).toString();
    const startAMPM = event.start_time < 1200 || event.start_time === 2400 ? "am" : "pm";
    const stopAMPM = event.stop_time < 1200 || event.stop_time === 2400 ? "am" : "pm";

    const [timeSetting, setTimeSetting] = useState("Custom");

    const timeChange = (e, mode, start, time) => {
        setTempEvent({
            ...event, 
            [start === true ? "start_time" : "stop_time"]: 
                mode === "hour"
                    ? (time < 1200 ? e.target.value * 100 : e.target.value * 100 + 1200)
                        + time % 100
                : mode === "minute"
                    ? (parseInt(time / 100) * 100 + parseInt(e.target.value))
                : mode === "ampm"
                    ? (e.target.value === "am" && time >= 1200)
                        ? time - 1200
                    : (e.target.value === "pm" && time < 1200)
                        ? time + 1200 
                    : time 
                : time,
        })
    }

    const createClick = () => {
        closeTempEvent();
        createEvent(event);
    }

    const editClick = () => {
        closeTempEvent();
        editEvent(event);
    }

    const deleteClick = () => {
        closeTempEvent();
        deleteEvent(event._id);
    }

    return (
        <div
            className="event-form"
            style={{
                gridRowStart: gridRowStart <= 243 ? gridRowStart : 243,
                gridRowEnd: gridRowStart+48,
                gridColumnStart: gridColumnStart,
                gridColumnEnd: gridColumnStart+3
            }}
        >
            <div
                className="event-form-header"
                style={{justifyContent: firstEvent < 3 ? "flex-start" : "flex-end"}}
            >
                <i
                    className="fas fa-times"
                    onClick={closeTempEvent}
                />
            </div>

            <div className="event-form-body">

                <div>
                    {"Time: "}
                    <select
                        value={timeSetting}
                        onChange={e => {
                            setTimeSetting(e.target.value);
                            if (e.target.value !== "Custom")
                                setTempEvent({
                                    ...event,
                                    start_time: e.target.value === "All Day"
                                            ? 0
                                        : e.target.value === "Morning"
                                            ? 800
                                        : e.target.value === "Afternoon"
                                            ? 1200
                                        : e.target.value === "Evening"
                                            && 1600,
                                    stop_time: e.target.value === "All Day"
                                            ? 2400
                                        : e.target.value === "Morning"
                                            ? 1200
                                        : e.target.value === "Afternoon"
                                            ? 1600
                                        : e.target.value === "Evening"
                                            && 2000
                                })
                        }}
                        style={{marginRight: "1rem"}}
                    >
                        <option value="Custom" key="Custom">Custom</option>
                        <option value="All Day" key="All Day">All Day</option>
                        <option value="Morning" key="Morning">Morning</option>
                        <option value="Afternoon" key="Afternoon">Afternoon</option>
                        <option value="Evening" key="Evening">Evening</option>
                    </select>

                    {"Role: "}
                    <select
                        value={event.target}
                        onChange={e => setTempEvent(
                            { ...event, target: parseInt(e.target.value) }
                        )}
                    >
                        <option value="2" key="Both">Both</option>
                        <option value="1" key="Student">Student</option>
                        <option value="0" key="Tutor">Tutor</option>
                    </select>
                </div>
                
                <div className="time-input" style={
                    timeSetting!=="Custom"
                    ? {pointerEvents: "none", backgroundColor: 'lightgrey'}
                    : {}
                }>
                    {"Start Time: "}

                    <select
                        value={startHour}
                        onChange={(e) => timeChange(e, "hour", true, event.start_time)}
                    >
                        {Hours.map(elem => (
                            <option
                                value={elem}
                                disabled={
                                    ((event.start_time < 1200 ? elem * 100 : elem * 100 + 1200) 
                                        + event.start_time % 100) >= event.stop_time
                                }
                                key={"stop hour " + elem}
                            >
                                {elem}
                            </option>
                        ))}
                    </select>:

                    <select
                        value={startMinute}
                        onChange={((e) => timeChange(e, "minute", true, event.start_time))}
                    >
                        {Minutes.map(elem => (
                            <option
                                value={elem}
                                disabled={
                                    (startHour === stopHour && startAMPM === stopAMPM) &&
                                    (parseInt(elem) >= parseInt(stopMinute))
                                }
                                key={"stop minute " + elem}
                            >
                                {elem}
                            </option>
                        ))}
                    </select>

                    <select 
                        value={startAMPM}
                        onChange={((e) => timeChange(e, "ampm", true, event.start_time))}
                    >
                        {["am", "pm"].map(elem => 
                            <option
                                value={elem}
                                disabled={
                                    (elem === "pm" && 
                                    (event.start_time < 1200 &&
                                    event.start_time + 1200 >= event.stop_time))
                                }
                                key={"start " + elem}
                            >
                                {elem}
                            </option>)
                        }
                    </select>
                </div>

                <div className="time-input" style={
                    timeSetting!=="Custom"
                    ? {pointerEvents: "none", backgroundColor: 'lightgrey'}
                    : {}
                }>
                    {"Stop Time: "}

                    <select
                        value={stopHour}
                        onChange={(e) => timeChange(e, "hour", false, event.stop_time)}
                    >
                        {Hours.map(elem => (
                            <option
                                value={elem}
                                disabled={
                                    (stopAMPM === "pm" && parseInt(stopMinute) > 0 
                                        && parseInt(elem) === 12) ||
                                    ((event.stop_time < 1200 ? elem * 100 : elem * 100 + 1200) 
                                        + event.stop_time % 100) <= event.start_time
                                }
                                key={"stop hour " + elem}
                            >
                                {elem}
                            </option>
                        ))}
                    </select>:

                    <select
                        value={stopMinute}
                        onChange={(e) => timeChange(e, "minute", false, event.stop_time)}
                    >
                        {Minutes.map(elem => (
                            <option
                                value={elem}
                                disabled={
                                    ((startHour === stopHour && startAMPM === stopAMPM) &&
                                    (parseInt(elem) <= parseInt(startMinute))) ||
                                    (event.stop_time === 2400 && parseInt(elem) > 0)
                                }
                                key={"stop minute " + elem}
                            >
                                {elem}
                            </option>
                        ))}
                    </select>

                    <select 
                        value={stopAMPM}
                        onChange={((e) => timeChange(e, "ampm", false, event.stop_time))}
                    >
                        {["am", "pm"].map(elem => 
                            <option
                                value={elem}
                                disabled={
                                    (elem === "am" && 
                                    (event.stop_time >= 1200 && 
                                    event.stop_time - 1200 <= event.start_time)) ||
                                    (elem === "pm" && event.stop_time === 2400)
                                }
                                key={"stop " + elem}
                            >
                                {elem}
                            </option>)
                        }
                    </select>
                </div>

                <div className="days-input">
                    {"Days: "}
                    <div className="days-input-row">
                        {["U", "M", "T", "W", "R", "F", "S"].map( (elem, index) =>
                            <button
                                className={"day-input" +
                                    (event.days[index] ? " selected" : "")
                                }
                                onClick={() => !(event.days
                                    .reduce(
                                        (a, v) => (v === true ? a + 1 : a), 0
                                    ) === 1 && event.days[index] === true) &&
                                    setTempEvent({ ...event,
                                        days: event.days.map((day, dayi) =>
                                            dayi === index
                                            ? day === true ? false : true
                                            : day
                                        )
                                    }
                                )}
                                key={"Day " + elem}
                            >
                                {elem}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="event-form-footer">
                <button
                    className="btn btn-primary event-form-btn"
                    onClick={() => editMode === true ? editClick() : createClick()}
                >
                    {editMode ? "Edit" : "Create"}
                </button>

                {editMode &&
                    <button
                        className="btn btn-danger event-form-btn"
                        onClick={() => deleteClick()}
                    >
                        Delete
                    </button>
                }
            </div>
        </div>
    )
}

export default connect(null, {createEvent, editEvent, deleteEvent})(CalendarEventForm)
