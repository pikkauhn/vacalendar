'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from 'primereact/button'
import React from 'react'

const SigninButton = () => {
    const { data: session } = useSession()
    if (session && session.user) {
        return (
            <div>
                {session.user.name}
                <Button onClick={() => signOut()}>Sign Out</Button>
            </div>
        )
    }
    return (
        <Button onClick={() => signIn()}>
            Sign In
        </Button>
    )
}

export default SigninButton