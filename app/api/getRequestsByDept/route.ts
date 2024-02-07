import prisma from "@/app/lib/prisma";

interface RequestBody {
    dept: string,
    isAdmin: boolean,
    employeeId: number
}

export async function POST(request: Request): Promise<Response> {
    const body: RequestBody = await request.json();
    const dept = body.dept;
    const isAdmin = body.isAdmin;
    const employeeId = body.employeeId;
    try {
        if (isAdmin) {
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
        } else {
            const timeOffRequests = await prisma.timeOffRequest.findMany({
                where: {
                    user: { employeeId: employeeId }
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
        }
    } catch (error: any) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    };
};