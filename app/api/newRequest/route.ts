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
            isPaid: body.isPaid,
        },
    });
    const timeOff = await prisma.timeOffBalance.update({
        where: {
            userId: body.employeeId
        },
        data:{
            year: body.yearly,
            balance: body.balance,
        },
    })

    const {...result} = user;    
    const setTime = timeOff;
    console.log(result);
    console.log(setTime);

    return new Response(JSON.stringify(result));
}