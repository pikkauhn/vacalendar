import React from 'react'

import ListUsers from '@/app/components/ListUsers'

const page = async () => {
    const result: any = await ListUsers();
    return (
        <>
            {result ? result.map((data: any, idx: number) => {
                return (
                    <p key={idx}>{data.firstname}</p>
                )
            }) : null}
        </>
    )
}

export default page