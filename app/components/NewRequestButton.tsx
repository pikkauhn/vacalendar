'use client'
import { OverlayPanel } from 'primereact/overlaypanel'
import React, { useRef } from 'react'

import NewRequestForm from './NewRequestForm'
import { Button } from 'primereact/button'
import { useSession } from 'next-auth/react'

const NewRequestButton = () => {
    const request = useRef(null!) as React.RefObject<OverlayPanel>;
    const { data: session } = useSession();
    let user;
    if (session && !session.user.isAdmin) {
    user = true;
    } else {
        user = false;
    }

    const addRequest = (e: any) => {
        if (request.current) {
          request.current.toggle(e)
        }
      }

    return (
        <>
        <Button label="New Request" visible={user}  onClick={(e) => addRequest(e)} text />        
        <OverlayPanel className='w-4' dismissable={false} closeOnEscape showCloseIcon ref={request}>
            <NewRequestForm />
        </OverlayPanel>
        </>
    )
}

export default NewRequestButton