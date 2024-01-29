import prisma from "@/app/lib/prisma";
import * as argon2 from 'argon2'

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
            password: await argon2.hash(body.password),
        },
    });

    const {password, ...result} = user;

    return new Response(JSON.stringify(result));
}