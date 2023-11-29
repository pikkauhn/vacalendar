import React from 'react'
import Requests from '@/app/components/Requests';

interface Params {
    id: number;
}

export default function page({ params }: {
    params: Params,    
}) {    
    const requestId = params.id;
    

    return (
        <>
        <Requests id={requestId} />
        </>
    )
}