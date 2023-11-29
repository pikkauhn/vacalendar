import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt'

interface RequestBody {
    id:number;
    firstname:string;
    lastname:string;
    invite:string;
    email:string;
    password:string;
}

export async function POST(request: Request){
    const body:RequestBody = await request.json();

    const user = await prisma.user.create({
        data:{
            id: body.id,
            firstname: body.firstname,
            lastname: body.lastname,
            invite: body.invite,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
            dept: '',
            isAdmin: false
        },
    });

    const {password, ...result} = user;

    return new Response(JSON.stringify(result));
}