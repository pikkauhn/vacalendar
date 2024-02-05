'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css"

import SessionInfo from "./SessionInfo";

const localizer = momentLocalizer(moment);

interface View {
    title: string
    navigate: Date
}

interface Event {
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean,
    resource?: any,
    status: string
}

function transformToEvents(data: any[]): Event[] {
    const events: Event[] = [];
    for (const item of data) {
        try {
            const event: Event = {
                title: item.user.firstname + ' ' + item.user.lastname,
                start: new Date(item.startDate),
                end: new Date(item.endDate),
                allDay: false,
                resource: item,
                status: item.status
            };
            events.push(event);
        } catch (error) {
            console.error(`Error processing item: ${JSON.stringify(item)}`, error);
        }
    }
    return events;
}

function BigCalendar() {
    const [events, setEvents] = useState<Event[] | undefined>();
    useEffect(() => {
        async function getRequests() {
            const session = await SessionInfo();
            if (session?.isAdmin) {
                const dept = session?.dept;

                if (session) {
                    try {
                        const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/getRequestsByDept", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                dept: dept
                            }),
                        });
                        const response = await res.json();
                        const transformed = await transformToEvents(response);
                        console.log(transformed)
                        setEvents(transformed);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
        getRequests();
    }, [])


    const clickRef = useRef<any>();
    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: new Date(),
            views: [Views.MONTH, Views.WEEK],
        }),
        []
    );

    const onSelectEvent = useCallback((calEvent: any) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            console.log(calEvent)
        }, 250)
    }, []);

    return (
        <div>
            <Calendar
                localizer={localizer}
                defaultDate={defaultDate}
                defaultView="month"
                views={views}
                onSelectEvent={onSelectEvent}
                events={events}
            />
        </div>
    )
}

export default BigCalendar;