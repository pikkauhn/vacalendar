import { TimeOffRequest } from "@prisma/client";

export default function OrderRequests(fetchedResults: any) {

    const adjustedRequests = fetchedResults.timerequests.map((data: TimeOffRequest) => ({
        ...data
    }));

    // Sort adjusted requests by pending status and startDate
    const orderedRequests: TimeOffRequest[] = adjustedRequests.sort((
        requestA: { status: string; startDate: string | number | Date; id: number; },
        requestB: { status: string; startDate: string | number | Date; id: number; }
    ) => {
        // Prioritize pending requests
        if (requestA.status === 'Pending' && requestB.status !== 'Pending') {
            return -1;
        } else if (requestA.status !== 'Pending' && requestB.status === 'Pending') {
            return 1;
        }
        // Sort non-pending requests by startDate (latest first)
        if (requestA.startDate !== requestB.startDate) {
            return new Date(requestB.startDate).getTime() - new Date(requestA.startDate).getTime();
        }
        // If start dates are equal, prioritize based on id (optional)
        return requestB.id - requestA.id; // Sort by id if start dates are the same
    });
    if (orderedRequests.length > 0) {
        return orderedRequests;
    }

}