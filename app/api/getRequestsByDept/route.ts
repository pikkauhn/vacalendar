import prisma from "@/app/lib/prisma";

interface RequestBody {
    dept: string
}

export async function POST(request: Request): Promise<Response> {
    const body: RequestBody = await request.json();
    const dept = body.dept;
    try {
        const timeOffRequests = await prisma.timeOffRequest.findMany({
            where: {
                status: {
                    in: ['Pending', 'Approved']
                },
                user: {
                    dept: dept,
                },
            },
            select: {
                id: true,
                startDate: true,
                endDate: true,
                status: true,
                user: {
                    select: {
                        employeeId: true,
                        firstname: true,
                        lastname: true,
                        isAdmin: true,
                    }
                }
            }
        });

        return new Response(JSON.stringify(timeOffRequests));
    } catch (error: any) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    };
};