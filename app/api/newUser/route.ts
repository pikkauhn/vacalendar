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
    try {
        const hash = await argon2.hash(body.password);
        const user = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.create({
                data: {
                    firstname: body.firstname,
                    lastname: body.lastname,
                    phone: body.phone.toString(),
                    email: body.email,
                    employeeId: body.employeeId,
                    dept: body.dept,
                    isAdmin: false,
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