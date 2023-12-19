"use client"

import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

const CredForm = () => {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [employeeId, setEmployeeID] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            alert('Passwords must match!')
        }
        else {
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        employeeId: parseInt(employeeId),
                        password: password,
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
            <InputText className='flex mb-2' id='name' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <InputText className='flex mb-2' id='name' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <InputText className='flex mb-2' id='name' placeholder='Invite Code' value={employeeId} onChange={(e) => setEmployeeID(e.target.value)} />
            <InputText className='flex mb-2' type='email' id='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputText className='flex mb-2'
                id='password' type='password' placeholder='Create Password' value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputText className='flex mb-2'
                id='password' type='password' placeholder='Re-Enter Password' value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button className='mt-2' type="submit" label="Submit" />
        </form>
    )
}

export default CredForm