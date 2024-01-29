'use client'
import React, { useReducer, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { useRouter } from 'next/navigation'

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
    employeeID: string;
    phone: string;
    vacationYear: string;
    vacationBal: string;
    sickYear: string;
    sickBal: string;
    admin: boolean;
};

const initialState: State = {
    firstName: '',
    lastName: '',
    department: { name: '', code: '' },
    employeeID: '',
    phone: '',
    vacationYear: '',
    vacationBal: '',
    sickYear: '',
    sickBal: '',
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
    const router = useRouter();
    const [employeeData, dispatch] = useReducer(reducer, initialState);
  
    const handleFieldChange = (e: FieldChangeEvent) => {
      dispatch({ type: 'UPDATE_FIELD', payload: { field: e.target.id, value: e.target.value } });
    };
  
    const handleDepartmentChange = (e: DropdownChangeEvent) => {
      dispatch({ type: 'UPDATE_FIELD', payload: { field: 'department', value: e.value } });
    };
  
    const handleAdminChange = () => {
      dispatch({ type: 'TOGGLE_ADMIN', payload: !employeeData.admin });
    };

    const onSubmit = async () => {
        console.log(employeeData.vacationBal)
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/newEmployee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    employeeId: parseInt(employeeData.employeeID),
                    firstname: employeeData.firstName,
                    lastname: employeeData.lastName,
                    dept: employeeData.department.name,
                    phone: parseInt(employeeData.phone),
                    isAdmin: employeeData.admin,
                    vacationYear: parseFloat(employeeData.vacationYear),
                    vacationBal: parseFloat(employeeData.vacationBal),
                    sickYear: parseFloat(employeeData.sickYear),
                    sickBal: parseFloat(employeeData.sickBal),
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
                    <InputText id="firstName" value={employeeData.firstName} required placeholder='First Name' onChange={(e) => handleFieldChange(e)} />
                    <InputText id="lastName" value={employeeData.lastName} required placeholder='Last Name' onChange={(e) => handleFieldChange(e)} />
                </div>
            </div>
            <div className="grid">
                <div className='col'>
                    <InputText id="employeeID" value={employeeData.employeeID} required placeholder='Employee ID' onChange={(e) => handleFieldChange(e)} />
                    <InputText id="phone" value={employeeData.phone} required placeholder='Employee Phone Number' onChange={(e) => handleFieldChange(e)} />
                </div>
            </div>
            <div className="grid">
                <div className="col">
                    <InputText id="vacationYear" value={employeeData.vacationYear} required placeholder='Vacation Allowed' onChange={(e) => handleFieldChange(e)} />
                    <InputText id="vacationBal" value={employeeData.vacationBal} required placeholder='Vacation Balance' onChange={(e) => handleFieldChange(e)} />
                </div>
            </div>
            <div className="grid">
                <div className="col">
                    <InputText id="sickYear" value={employeeData.sickYear} required placeholder='Sick Allowed' onChange={(e) => handleFieldChange(e)} />
                    <InputText id="sickBal" value={employeeData.sickBal} required placeholder='Sick Balance' onChange={(e) => handleFieldChange(e)} />
                </div>
            </div>
            <span>
                <Dropdown id="department" value={employeeData.department} required placeholder='Select Department' onChange={(e) =>handleDepartmentChange(e)} options={departments} optionLabel="code" />
                <Checkbox id="admin" value='Admin' checked={employeeData.admin} onClick={handleAdminChange} />
                <label className="ml-2" >Admin</label>
            </span>
            <Button type='button' label="Submit" outlined icon='pi pi-check' onClick={(e) => { onSubmit() }} />

        </>
    )
}

export default NewEmployeeForm