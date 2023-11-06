'use client'

import { Calendar } from 'primereact/calendar';
import { useState } from 'react';


export default function Cal() {
    const today =  new Date()
const [date, setDate] = useState(today)

    return (
        <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
        </div>

    )
}