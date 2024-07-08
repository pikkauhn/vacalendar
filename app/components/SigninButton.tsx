'use client'
import './style.css'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'

const SigninButton = () => {
    const { data: session } = useSession()   
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            setIsVisible(windowWidth >= 960);
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    

    if (session && session.user) {
        const userName = session.user.firstname;
        if (userName) {
            const name = userName.charAt(0).toUpperCase() + userName.slice(1);
            return (name &&
                <div className="flex">                    
                    {isVisible && <h3 className='flex-initial flex align-items-center justify-content-center mr-3'>Welcome, {name}</h3>}
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