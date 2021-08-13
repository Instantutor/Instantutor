import React from 'react'

const CalendarEventForm = ({event, gridRowStart, firstEvent}) => {

    let gridColumnStart = firstEvent + 2;
    gridColumnStart = gridColumnStart < 5 ? gridColumnStart + 1 : gridColumnStart - 3;

    return (
        <div
            className="event-form"
            style={{
                gridRowStart: gridRowStart <= 255 ? gridRowStart : 255,
                gridRowEnd: gridRowStart+36,
                gridColumnStart: gridColumnStart,
                gridColumnEnd: gridColumnStart+3
            }}
        >
            <form className="form">
                hi :)
            </form>
        </div>
    )
}

export default CalendarEventForm
