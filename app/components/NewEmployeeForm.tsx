'use client'
import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

interface FieldChangeEvent {
    target: {
        id: string;
        value: string;
    };
}

const NewEmployeeForm = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [employeeID, setEmployeeID] = useState<string>('');
    const [yearly, setYearly] = useState<string>('');
    const [balance, setBalance] = useState<string>('');
    const [admin, setAdmin] = useState<boolean>(false);

    const departments = [
        { name: 'GIS', code: "GIS" },
        { name: 'Office', code: "Office" },
        { name: 'Readers', code: "Read" },
        { name: 'Shop Water', code: "SHW" },
        { name: 'Assistant Manager', code: "AM" },
        { name: 'Shop Waste Water', code: "SHWW" },
        { name: 'Water Treatment Plant', code: "WTP" },
        { name: 'Waste Water Treatment Plant', code: "WWTP" }
    ]

    type Setter<T> = (value: T) => void;

    const setters: {
        employeeIDInput: Setter<string>;
        yearlyInput: Setter<string>;
        balanceInput: Setter<string>;
        firstNameInput: Setter<string>;
        lastNameInput: Setter<string>;
    } = {
        employeeIDInput: setEmployeeID,
        yearlyInput: setYearly,
        balanceInput: setBalance,
        firstNameInput: setFirstName,
        lastNameInput: setLastName,
    };

    const onFieldChange = (e: FieldChangeEvent) => {
        const input = e.target.id as keyof typeof setters;
        const setter = setters[input];
        if (setter) {
            setter(e.target.value);
        }
    };

    const onSubmit = async () => {
        console.log(firstName, lastName, employeeID, department[0], yearly, balance)
    }

    return (
        <>
            <div className='grid'>
                <div className='col'>
                    <InputText id="firstNameInput" value={firstName} required placeholder='First Name' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e)} />
                    <InputText id="lastNameInput" value={lastName} required placeholder='Last Name' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e)} />
                </div>
            </div>
            <div className="grid">
                <div className='col'>
                    <InputText id="employeeIDInput" value={employeeID} required placeholder='Employee ID' onChange={(e) => onFieldChange(e)} />
                    <Dropdown id="departmentInput" value={department} required placeholder='Select Department' onChange={(e: DropdownChangeEvent) => setDepartment(e.value)} options={departments} optionLabel="code" />
                </div>
            </div>
            <div className="grid">
                <div className="col">
                    <InputText id="yearlyInput" value={yearly} required placeholder='Yearly Allowed' onChange={(e) => onFieldChange(e)} />
                    <InputText id="balanceInput" value={balance} required placeholder='Current Balance' onChange={(e) => onFieldChange(e)} />
                </div>
            </div>
            <span>
                <Checkbox id="adminInput" value='Admin' checked={admin} onClick={(e) => setAdmin(!admin)} />
                <label className="ml-2" >Admin</label>
            </span>
            <Button type='button' label="Submit" outlined icon='pi pi-check' onClick={(e) => { onSubmit() }} />

        </>
    )
}

export default NewEmployeeForm