import prisma from "@/app/lib/prisma";

interface RequestBody {
    employeeId: number;
    phone: string;
    firstname: string;
    lastname: string;
    dept: string;
    isAdmin: boolean;
    vacationYear: number;
    vacationBal: number;
    sickYearly: number;
    sickBal: number;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    console.log(body)
    const user = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
            data: {
                employeeId: body.employeeId,
                firstname: body.firstname,
                lastname: body.lastname,
                dept: body.dept,
                isAdmin: body.isAdmin,
                phone: body.phone.toString(),
                password: '',
            },
        });
        await prisma.vacationBalance.create({
            data: {
                userId: body.employeeId,
                vacationYear: body.vacationYear,
                vacationBal: body.vacationBal,
            },
        })
        await prisma.sickBalance.create({
            data: {
                userId: body.employeeId,
                sickYear: body.sickYearly,
                sickBal: body.sickBal,
            }
        })
        return user;
    });

    const { password, ...result } = user;

    return new Response(JSON.stringify(result));
}