'use client'
import React, { useReducer } from 'react'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { Nullable } from 'primereact/ts-helpers'

interface FieldChangeEvent {
    target: {
        id: string;
        value: string;
    };
};

interface State {
    firstName: string;
    lastName: string;
    department: { name: string; code: string };
    employeeID: number | null;
    phone: number | null;
    vacationYear: number | null;
    vacationBal: number | null;
    sickYear: number | null;
    sickBal: number | null;
    admin: boolean;
};

const initialState: State = {
    firstName: '',
    lastName: '',
    department: { name: '', code: '' },
    employeeID: null,
    phone: null,
    vacationYear: null,
    vacationBal: null,
    sickYear: null,
    sickBal: null,
    admin: false,
};

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

const reducer = (state: State, action: { type: string; payload: any }) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case 'TOGGLE_ADMIN':
            return { ...state, admin: !state.admin };
        default:
            return state;
    }
};

const NewEmployeeForm = () => {
    const [employeeData, dispatch] = useReducer(reducer, initialState);

    const handleFieldChange = (e: FieldChangeEvent | InputNumberValueChangeEvent) => {
        dispatch({ type: 'UPDATE_FIELD', payload: { field: e.target.id, value: e.target.value } });
    };

    const handleDepartmentChange = (e: DropdownChangeEvent) => {
        dispatch({ type: 'UPDATE_FIELD', payload: { field: 'department', value: e.value } });
    };

    const handleAdminChange = () => {
        dispatch({ type: 'TOGGLE_ADMIN', payload: !employeeData.admin });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(process.env.NEXT_NEXTAUTH_URL + "/api/newEmployee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    employeeId: employeeData.employeeID,
                    firstname: employeeData.firstName,
                    lastname: employeeData.lastName,
                    dept: employeeData.department.name,
                    phone: employeeData.phone,
                    isAdmin: employeeData.admin,
                    vacationYear: employeeData.vacationYear,
                    vacationBal: employeeData.vacationBal,
                    sickYear: employeeData.sickYear,
                    sickBal: employeeData.sickBal,
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
        <form onSubmit={(e) => { onSubmit(e) }}>
            <div className='grid flex-wrap p-fluid'>
                <div className='col'>
                    <InputText id="firstName" value={employeeData.firstName} required placeholder='First Name' onChange={(e) => handleFieldChange(e)} />
                    <InputNumber id="employeeID" className='mt-1' value={employeeData.employeeID} required maxLength={5} useGrouping={false} placeholder='Employee ID' onValueChange={(e: InputNumberValueChangeEvent) => handleFieldChange(e)} />
                    <InputNumber id="vacationYear" className='mt-1' value={employeeData.vacationYear} required maxLength={3} placeholder='Max Vacation Allowed' onValueChange={(e: InputNumberValueChangeEvent) => handleFieldChange(e)} />
                    <InputNumber id="sickYear" className='mt-1' value={employeeData.sickYear} required maxLength={3} placeholder='Max Sick Allowed' onValueChange={(e: InputNumberValueChangeEvent) => handleFieldChange(e)} />
                    <Dropdown id="department" className='mt-1' value={employeeData.department} required placeholder='Select Department' onChange={(e) => handleDepartmentChange(e)} options={departments} optionLabel="code" />
                </div>
                <div className='col'>
                    <InputText id="lastName" className='mt-1' value={employeeData.lastName} required placeholder='Last Name' onChange={(e) => handleFieldChange(e)} />
                    <InputNumber id="phone" className='mt-1' value={employeeData.phone} required maxLength={10} mode="decimal" useGrouping={false} maxFractionDigits={0} placeholder='Phone Number' onValueChange={(e: InputNumberValueChangeEvent) => handleFieldChange(e)} />
                    <InputNumber id="vacationBal" className='mt-1' value={employeeData.vacationBal} required maxLength={3} placeholder='Current Vacation Balance' maxFractionDigits={2} onValueChange={(e: InputNumberValueChangeEvent) => handleFieldChange(e)} />
                    <InputNumber id="sickBal" className='mt-1' value={employeeData.sickBal} required maxLength={3} placeholder='Current Sick Balance' maxFractionDigits={2} onValueChange={(e: InputNumberValueChangeEvent) => handleFieldChange(e)} />
                    <Checkbox id="admin" className='mt-2' value='Admin' checked={employeeData.admin} onClick={handleAdminChange} />
                    <label>Admin</label>
                </div>
                <Button type='submit' label="Submit" outlined icon='pi pi-check' />
            </div>
        </form>
    )
}

export default NewEmployeeForm