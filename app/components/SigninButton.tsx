'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from 'primereact/button'
import React from 'react'

const SigninButton = () => {
    const { data: session } = useSession()   
    if (session && session.user) {
        const userName = session.user.firstname;
        if (userName) {
            const name = userName.charAt(0).toUpperCase() + userName.slice(1);
            return (name &&
                <div className="flex">
                    <h3 className='flex-initial flex align-items-center justify-content-center mr-3'>Welcome, {name}</h3>
                    <Button label="Sign Out" onClick={() => signOut({callbackUrl: '/'})} size='large' text />
                </div>
            )
        }
    }
    return (
        
        <Button label="Sign In" onClick={() => signIn(undefined, { callbackUrl: '/Calendar'})} size='large' text />
        
    )
}

export default SigninButton