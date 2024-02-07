import SessionInfo from '@/app/components/SessionInfo';

async function UpdateRequest(requestInfo: any) {
    const session = await SessionInfo();
    console.log(requestInfo)
    if (session?.isAdmin) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/requests/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: requestInfo.id,
                    status: requestInfo.status,
                    notes: requestInfo.notes
                }),

            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response;
        } catch (error) {
            console.error('UpdateRequests error:', error);
        }
    } 
    if (!session?.isAdmin && (requestInfo.status === 'Cancelled')) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/requests/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: requestInfo.id,
                    status: requestInfo.status,
                    notes: requestInfo.notes
                }),

            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response;
        } catch (error) {
            console.error('UpdateRequests error:', error);
        }
    }    
    else {
        console.error('User does not have permission');
    }
}

export default UpdateRequest;