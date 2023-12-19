import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt'

interface RequestBody {
    employeeId:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export async function POST(request: Request){
    const body:RequestBody = await request.json();

    const user = await prisma.user.update({
        where: {
            employeeId: body.employeeId,
            firstname: body.firstName,
            lastname: body.lastName,
        },
        data:{
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        },
    });

    const {password, ...result} = user;

    return new Response(JSON.stringify(result));
}