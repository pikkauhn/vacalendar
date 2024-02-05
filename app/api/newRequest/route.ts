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
    console.log(body)
    const user = await prisma.timeOffRequest.create({
        data:{
            userId: parseInt(body.employeeId.toString()),
            reason: body.reason,
            startDate: body.startDate,
            endDate: body.endDate,
            timeOffType: body.timeOffType,
            notes: '',
            isPaid: body.isPaid,
        },
    });
    // const timeOff = await prisma.vacationBalance.update({
    //     where: {
    //         userId: parseInt(body.employeeId.toString())
    //     },
    //     data:{
    //         vacationYear: body.yearly,
    //         vacationBal: body.balance,
    //     },
    // })

    const {...result} = user;    

    return new Response(JSON.stringify(result));
}