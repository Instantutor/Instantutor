import React, { useState, Fragment } from 'react';
import CalendarEventForm from './CalendarEventForm';

const CalenderEvent = ({
        event,
        weekStart,
        createMode,
        setCreateMode,
        setTempEvent
    }) => {

        var exceptionsIndex = 0;
        let startHour = event.start_time < 100 ? 12 : parseInt(event.start_time / 100);
        let stopHour = event.stop_time < 100 ? 12 : parseInt(event.stop_time / 100);

        let gridRowStart = parseInt(event.start_time / 100) * 12 
            + (event.start_time % 100) / 5 + 3;
        let gridRowEnd = parseInt(event.stop_time / 100) * 12
            + (event.stop_time % 100) / 5 + 3;

        const onClick = () => {
            if (createMode === true) {
                setTempEvent({ _id: 1, target: 2, days: new Array(7).fill(false) });
                setCreateMode(false);
            } else {
                setTempEvent(event);
                setCreateMode(true);
            }
        }
        
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
                            opacity: createMode === true ? 0.75 : 1,
                            gridColumnStart: index+2,
                            gridColumnEnd: index+3,
                            gridRowStart: gridRowStart,
                            gridRowEnd: gridRowEnd
                        }}
                        onClick={onClick}
                    >
                        {startHour < 13 ? startHour : startHour === 24 ? 12 : startHour % 12}
                        :{event.start_time % 100 < 10 && "0"}{event.start_time % 100}
                        {startHour < 12 || event.start_time < 100 ? "am" : "pm"}
                        {" - "}
                        {stopHour < 13 ? stopHour : stopHour === 24 ? 12 : stopHour % 12}
                        :{event.stop_time % 100 < 10 && "0"}{event.stop_time % 100}
                        {stopHour < 12 || stopHour === 24 ? "am" : "pm"}
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

                {createMode ?
                    <CalendarEventForm
                        event={event}
                        gridRowStart={gridRowStart}
                        firstEvent={
                            parsedEvents &&
                            parsedEvents.length > 0 &&
                            parsedEvents[0].props.value.getDay()
                        }
                        setTempEvent={setTempEvent}
                        onClick={onClick}
                    />
                    : null
                }
            </Fragment>
        )
}

export default CalenderEvent

