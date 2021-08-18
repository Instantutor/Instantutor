import React from 'react'

const Hours = new Array(12).fill(0).map((elem, index) => (index + 1).toString());
const Minutes = new Array(12).fill(0).map((elem, index) => 
    index < 2 ? "0" + (index * 5).toString() : (index * 5).toString()
);

const CalendarEventForm = ({
        event,
        gridRowStart,
        firstEvent,
        setTempEvent,
        onClick
    }) => {

        const gridColumnStart = firstEvent < 3 ? firstEvent + 3 : firstEvent - 1;

        const startHour = event.start_time < 100 ? 12 :
            event.start_time <= 1300 ? parseInt(event.start_time / 100) :
            parseInt((event.start_time - 1200) / 100);
        const stopHour = event.stop_time < 100 ? 12 :
            event.stop_time <= 1300 ? parseInt(event.stop_time / 100) :
            parseInt((event.stop_time - 1200) / 100);
        const startMinute = event.start_time%100 !== 5 ? event.start_time%100 : "05";
        const stopMinute = event.stop_time%100 !== 5 ? event.stop_time%100 : "05";
        const startAMPM = event.start_time < 1200 || event.start_time === 2400 ? "am" : "pm";
        const stopAMPM = event.stop_time < 1200 || event.stop_time === 2400 ? "am" : "pm";

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
                        onClick={onClick}
                    />
                </div>

                <div className="event-form-body">
                    <div className="time-input">
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

                    <div className="time-input">
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
                        {["U", "M", "T", "W", "R", "F", "S"].map( (elem, index) => 
                            <button
                                className={"day-input" +
                                    (event.days[index] ? " selected" : "")
                                }
                                onClick={() => setTempEvent({ ...event, 
                                    days: event.days.map((day, dayi) => 
                                        dayi === index 
                                        ? day === true ? false : true 
                                        : day
                                    )
                                })}
                                key={"Day " + elem}
                            >
                                {elem}
                            </button>
                        )}

                    </div>
                </div>

                <div className="event-form-footer">
                    <button
                        className="btn btn-primary"
                        onClick={() => console.log("submit")}
                    >
                        Submit
                    </button>
                </div>
            </div>
        )
}

export default CalendarEventForm
