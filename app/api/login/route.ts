import { signJwtAccessToken } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";
import * as argon2 from 'argon2';

interface RequestBody{
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const body:RequestBody = await request.json();

    const user = await prisma.user.findFirst({
        where: {
            email:body.username,            
        }
    })
    if (user && ( await argon2.verify(user.password, body.password))) {
        const {password, ...userWithoutPass} = user;
        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken,
        }
        return new Response(JSON.stringify(result));
    }
    else return new Response(JSON.stringify(null));
}