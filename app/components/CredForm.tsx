"use client"

import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

const CredForm = () => {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [employeeId, setEmployeeID] = useState('');
    const [department, setDepartment] = useState('');

    const departments = [
        "GIS",
        "Office",
        "Read",
        "SHW",
        "AM",
        "SHWW",
        "WTP",
        "WWTP"
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            alert('Passwords must match!')
        }
        else {
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/newUser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstname: firstName,
                        lastname: lastName,
                        phone,
                        email,
                        employeeId: parseInt(employeeId),
                        dept: department,
                        password,
                    }),
                });
                if (res) {
                    router.replace('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <form className='flex flex-column' onSubmit={(e) => handleSubmit(e)}>
            <InputText required className='flex mb-2' id='firstname' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <InputText required className='flex mb-2' id='lastname' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <InputText required className='flex mb-2' id='phone' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
            <InputText required className='flex mb-2' id='employeeId' placeholder='Employee ID' value={employeeId} onChange={(e) => setEmployeeID(e.target.value)} />
            <Dropdown id="department" className='flex mb-2' value={department} required placeholder='Select Department' onChange={(e) => setDepartment(e.value)} options={departments}/>
            <InputText required className='flex mb-2' type='email' id='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputText required className='flex mb-2'
                id='pass' type='password' placeholder='Create Password' value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputText required className='flex mb-2'
                id='pass2' type='password' placeholder='Re-Enter Password' value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button className='mt-2' type="submit" label="Submit" />
        </form>
    )
}

export default CredForm