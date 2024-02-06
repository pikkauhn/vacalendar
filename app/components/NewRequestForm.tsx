'use client'
import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { useSession } from 'next-auth/react';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';

const NewRequestForm = (users: any) => {
    const { data: session } = useSession();
    const userId = session?.user.employeeId;
    const admin = session?.user.isAdmin;
    const [requestType, setRequestType] = useState<{ name: string; code: string }>({ name: '', code: '' });
    const [reason, setReason] = useState<string>('');
    const [startDate, setStartDate] = useState<Nullable<Date>>(null);
    const [endDate, setEndDate] = useState<Nullable<Date>>(null);
    const [employeeId, setEmployeeId] = useState<Nullable<number>>(null);
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [minDate, setMinDate] = useState<Date>();
    const [hours, setHours] = useState<Nullable<number>>(null);

    const types = [
        { name: 'Vacation', code: 0 },
        { name: 'Sick', code: 1 },
        { name: 'None', code: 2 }
    ]

    useEffect(() => {
        if (startDate) {
            let date = new Date();
            date.setDate(startDate.getDate());
            setMinDate(date);
        }
    }, [startDate]);

    useEffect(() => {
        if (!admin) {
            setEmployeeId(userId);
        }
    }, [admin, userId]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/newRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    employeeId,
                    reason,
                    startDate,
                    endDate,
                    timeOffType: requestType.name,
                    hours,
                    isPaid
                }),
            });
            if (res) {
                location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={(e) => {onSubmit(e)}}>
            <div className='grid flex-wrap p-fluid'>
                <div className='col'>
                    <InputText id="reasonInput" value={reason} required placeholder='Reason for Request' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setReason(e.target.value) }} />
                    <Calendar id="startDateInput" className='mt-1' value={startDate} required placeholder='Start Date' showTime hourFormat="12" onChange={(e) => setStartDate(e.value)} />
                    <Dropdown id="requestTypeInput" className='mt-1' value={requestType} required placeholder='Request Type' onChange={(e: DropdownChangeEvent) => setRequestType(e.value)} options={types} optionLabel="name" />
                    <Checkbox id="isPaidInput" className='mt-2' value='isPaid' checked={isPaid} onClick={(_e) => setIsPaid(!isPaid)} />
                    <label className="ml-2" >Request Paid Leave</label>
                </div>
                <div className='col'>
                    <InputNumber id="employeeIdInput" value={employeeId} disabled={!admin} required maxLength={5} useGrouping={false} placeholder='Employee ID' onValueChange={(e: InputNumberValueChangeEvent) => setEmployeeId(e.value)} />
                    <Calendar id="endDateInput" className='mt-1' value={endDate} required placeholder='End Date' showTime hourFormat="12" minDate={minDate} onChange={(e) => setEndDate(e.value)} />
                    <InputNumber id='hoursInput' className='mt-1' value={hours} required maxLength={5} placeholder='Hours Requested' maxFractionDigits={2} onValueChange={(e: InputNumberValueChangeEvent) => setHours(e.value)} />
                </div>
                <Button type='submit' className='mt-2' label="Submit" outlined icon='pi pi-check' />
            </div>
        </form>
    )
}

export default NewRequestForm