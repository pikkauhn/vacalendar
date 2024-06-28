import prisma from "@/app/lib/prisma";
const argon2 = require('argon2');

interface RequestBody {
    employeeId: number;
    phone: string;
    firstname: string;
    lastname: string;
    email: string;
    dept: string;
    isAdmin: boolean;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    console.log(body)
    try {
        const hash = await argon2.hash(body.password);
        const user = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.create({
                data: {
                    employeeId: body.employeeId,
                    firstname: body.firstname,
                    email: body.email,
                    lastname: body.lastname,
                    dept: body.dept,
                    isAdmin: false,
                    phone: body.phone.toString(),
                    password: hash, 
                },
            });
            await prisma.vacationBalance.create({
                data: {
                    userId: body.employeeId,
                    vacationYear: 0,
                    vacationBal: 0,
                },
            })
            await prisma.sickBalance.create({
                data: {
                    userId: body.employeeId,
                    sickYear: 0,
                    sickBal: 0,
                }
            })
            return user;
        });

        const { password, ...result } = user;

        return new Response(JSON.stringify(result));
    }
    catch (err) {
        return new Response(JSON.stringify(err));
    }
}