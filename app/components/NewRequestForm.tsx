'use client'
import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'

interface FieldChangeEvent {
    target: {
        id: string;
        value: string;
    };
}

const NewRequestForm = () => {
    const [requestType, setRequestType] = useState<{ name: string; code: string }>({ name: '', code: ''});
    const [reason, setReason] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [employeeId, setEmployeeId] = useState<string>('');
    const [isPaid, setIsPaid] = useState<boolean>(false);

    const types = [
        { name: 'Vacation', code: 0 },
        { name: 'Sick', code: 1 },
        { name: 'None', code: 2 }
    ]

    type Setter<T> = (value: T) => void;

    const setters: {
        reasonInput: Setter<string>,
        employeeIdInput: Setter<string>,
        startDateInput: Setter<string>,
        endDateInput: Setter<string>,
    } = {
        reasonInput: setReason,
        employeeIdInput: setEmployeeId,
        startDateInput: setStartDate,
        endDateInput: setEndDate,
    };

    const onFieldChange = (e: FieldChangeEvent) => {
        const input = e.target.id as keyof typeof setters;
        const setter = setters[input];
        if (setter) {
            setter(e.target.value);
        }
    };

    const onSubmit = async () => {   
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/newRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: employeeId,
                    reason: reason,
                    startDate: startDate,
                    endDate: endDate,
                    timeOffType: requestType,
                    isPaid: isPaid
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
        <>
            <div className='grid'>
                <div className='col'>
                    <InputText id="reasonInput" value={reason} required placeholder='Reason for Request' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e)} />
                    <InputText id="employeeIdInput" value={employeeId} required placeholder='Employee ID' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e)} />
                </div>
            </div>
            <div className="grid">
                <div className='col'>
                <InputText id="startDateInput" value={startDate} required placeholder='Start Date' onChange={(e) => onFieldChange(e)} />
                    <InputText id="endDateInput" value={endDate} required placeholder='End Date' onChange={(e) => onFieldChange(e)} />                   
                </div>
            </div>
            <div className="grid">
                <div className="col">
                <Dropdown id="requestTypeInput" value={requestType} required placeholder='Request Type' onChange={(e: DropdownChangeEvent) => setRequestType(e.value)} options={types} optionLabel="name" />
                <Checkbox id="isPaidInput" value='isPaid' checked={isPaid} onClick={(e) => setIsPaid(!isPaid)} />
                </div>
            </div>
            <Button type='button' label="Submit" outlined icon='pi pi-check' onClick={(e) => { onSubmit() }} />

        </>
    )
}

export default NewRequestForm