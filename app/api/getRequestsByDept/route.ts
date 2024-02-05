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
                user: {
                    dept: dept,
                }
            },
            include: {
                user: true
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