'use client'
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { useRouter } from "next/navigation";
const localizer = momentLocalizer(moment);
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css"

import SessionInfo from "./SessionInfo";
import arHolidays from "../components/Holidays";

interface Event {
    id: number | null,
    employeeId: number | null,
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean | null,
    status: string | null
}

interface Holiday {
    start: Date,
    end: Date,
    name: string,
}

const customComponents = {
    eventWrapper: (eventWrapperProps: any) => {
        const style = {
            background:
                eventWrapperProps.event.status === 'Pending' ? 'yellow' : '',
            padding: '5px',
        }
        return <div style={style}>{eventWrapperProps.children}</div>
    }
}

function transformToEvents(data: any[]): Event[] {
    const events: Event[] = [];
    for (const item of data) {
        try {
            const event: Event = {
                id: item.id,
                employeeId: item.user.employeeId,
                title: item.user.firstname + ' ' + item.user.lastname,
                start: new Date(item.startDate),
                end: new Date(item.endDate),
                allDay: false,
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
    const router = useRouter();
    const [events, setEvents] = useState<Event[] | undefined>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch holidays
                const holiday = await arHolidays();

                // Fetch requests (if user is admin)
                const session = await SessionInfo();
                if (session) {
                    const dept = session?.dept;
                    const isAdmin = session?.isAdmin;
                    const employeeId = session?.employeeId
                    if (session) {
                        const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/getRequestsByDept", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                dept: dept,
                                isAdmin: isAdmin,
                                employeeId: employeeId
                            }),
                        });
                        const response = await res.json();
                        const transformed = await transformToEvents(response);

                        // Combine events and holidays (if both exist)                
                        const modifiedHolidays = await holiday.map((holiday: Holiday) => ({
                            title: holiday.name,
                            start: new Date(holiday.start),
                            end: new Date(holiday.end),
                            id: null,
                            employeeId: null,
                            status: null,
                        }));

                        const combined = [...transformed, ...modifiedHolidays];
                        await setEvents(await combined);
                        setLoaded(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        if (!loaded) {
            fetchData();
        }
    }, [loaded]);

    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: new Date(),
            views: [Views.MONTH,],
        }),
        []
    );

    const onSelectEvent = (e: Event) => {
        if (e.id) {
            router.replace(`/Requests/${e.employeeId}?id=${e.id}`);
        }
    };

    const onNavigate = (e: Date) => {
     setDate(e);
    }

    return (
        <div>
            <Calendar
                localizer={localizer}
                components={customComponents}
                date={date}
                defaultDate={defaultDate}
                defaultView="month"
                views={views}
                onSelectEvent={(e) => { onSelectEvent(e) }}
                events={events}
                onNavigate={(e) => onNavigate(e)}
                popup
            >
            </Calendar>

        </div>
    )
}

export default BigCalendar;