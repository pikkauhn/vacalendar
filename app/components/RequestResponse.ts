import SessionInfo from '@/app/components/SessionInfo';

async function UpdateRequest(requestInfo: any) {
    const session = await SessionInfo();
    if (session?.isAdmin) {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL || "https://swu-vacalendar.onrender.com/api/requests/", {
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
    } else {
        console.error('User does not have permission');
    }
}

export default UpdateRequest;