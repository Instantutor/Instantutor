import React, { useState, Fragment } from 'react';
import Calendar from './Calendar';
import CalendarEventForm from './CalendarEventForm';

const CalenderEvent = ({
        event,
        weekStart,
        createMode,
        editMode, 
        editModes,
        setEditModes,
        setCreateMode
    }) => {

        var exceptionsIndex = 0;

        let gridRowStart = parseInt(event.start_time / 100) * 12 
            + (event.start_time % 100) / 5 + 3;
        let gridRowEnd = parseInt(event.stop_time / 100) * 12
            + (event.stop_time % 100) / 5 + 3;
        
        var parsedEvents = createMode !== false && event.days
            .map( (elem, index) => {
                if (!elem)
                    return false;
                
                return (
                    <div
                        className="event"
                        key={"Event " + event._id + index.toString()}
                        value={new Date(
                            weekStart.getFullYear(),
                            weekStart.getMonth(),
                            weekStart.getDate() + index
                        )}
                        style={{
                            backgroundColor: event.target === 2 ? "darkviolet"
                                : event.target === 1 ? "#17a2b8"
                                : "#c4302b",
                            opacity: createMode || editMode.edit ? 0.75 : 1,
                            gridColumnStart: index+2,
                            gridColumnEnd: index+3,
                            gridRowStart: gridRowStart,
                            gridRowEnd: gridRowEnd
                        }}
                        onClick={() => {
                            if(!createMode) {
                                setEditModes(
                                    editModes.map(elem =>
                                        elem.id === editMode.id 
                                        ? { id: elem.id, edit: true}
                                        : { id: elem.id, edit: false}
                                    )
                                )
                                setCreateMode(false);
                            }
                            // else
                            //     console.log("on create mode")
                            }
                        }
                    >
                        {parseInt(event.start_time / 100)}
                        :{event.start_time % 100 < 10 && "0"}{event.start_time % 100}
                        {event.start_time / 100 < 12  ? "am" : "pm"}
                        {" - "}
                        {parseInt(event.stop_time / 100)}
                        :{event.stop_time % 100 < 10 && "0"}{event.stop_time % 100}
                        {event.stop_time / 100 < 12  ? "am" : "pm"}
                    </div>
                )
            })
            .filter(elem => {
                if (elem === false ||
                    (event.start_date && elem.props.value.getDate() < event.start_date) ||
                    (event.stop_date && elem.props.value.getDate() > event.stop_date)) 
                        return false
                if (event.exceptions && elem.props.value.getDate() === 
                    new Date(event.exceptions[exceptionsIndex]).getDate()
                ) {
                    exceptionsIndex += 1;
                    return false;
                }
                return true
            })

        return (
            <Fragment>
                {parsedEvents}

                {createMode || (editMode && editMode.edit) ?
                    <CalendarEventForm
                        event={event}
                        gridRowStart={gridRowStart}
                        firstEvent={parsedEvents && parsedEvents[0].props.value.getDay()}
                    /> 
                    : null
                }
            </Fragment>
        )
}

export default CalenderEvent

