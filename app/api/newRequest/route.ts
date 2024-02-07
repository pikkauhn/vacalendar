import prisma from "@/app/lib/prisma";

interface RequestBody {
    employeeId: number;
    reason:string;
    startDate:string;
    endDate: string;
    timeOffType: string;
    isPaid: boolean;
    yearly: number;
    balance: number;
    hours: number;
}

export async function POST(request: Request){
    const body:RequestBody = await request.json();
    const user = await prisma.timeOffRequest.create({
        data:{
            userId: body.employeeId,
            reason: body.reason,
            startDate: body.startDate,
            endDate: body.endDate,
            timeOffType: body.timeOffType,
            notes: '',
            hours: body.hours,
            isPaid: body.isPaid,
        },
    });

    const {...result} = user;    

    return new Response(JSON.stringify(result));
}