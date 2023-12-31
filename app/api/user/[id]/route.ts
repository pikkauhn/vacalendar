import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const accessToken = request.headers.get("authorization")
    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({
            error:"unauthorized"
        }),
        {
            status: 401,
        });
    }
    const userRequests = await prisma.timeOffRequest.findMany({
        where: { userId: +params.id },
        include: {
            user: {
                select: {
                    email: true,
                    firstname: true,
                    lastname: true,
                }
            }
        }
    });

    return new Response(JSON.stringify(userRequests));
}