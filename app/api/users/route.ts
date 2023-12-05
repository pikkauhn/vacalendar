import prisma from "@/app/lib/prisma";

interface RequestBody {
    userId: number;
    email: string;
    isAdmin: boolean;
}

// Get Users or Requests for specific user if id not equal to 0;
export async function POST(request: Request): Promise<Response> {
    const body: RequestBody = await request.json();
    const userid = parseInt(body.userId.toString());

    if (userid === 0) {
        if (body.isAdmin) {
            try {
                const result = await prisma.user.findMany({
                    include: {
                        timebalance: true,
                        timerequests: true,
                    },
                });
                let userInfo = <any>[];
                result.map((data, idx) => {
                    const { isAdmin, password, invite, ...userWithoutPass } = result[idx];
                    userInfo.push(userWithoutPass);
                });
                return new Response(JSON.stringify(userInfo));
            } catch (error) {
                console.error(error);
                // Narrow down the type of the error object
                if (error instanceof Error) {
                    return new Response(JSON.stringify({ error: error.message }), {status: 500});
                } else {
                    // If the error is not an Error instance, handle it differently
                    console.error('Unexpected error type:', error);
                    return new Response(JSON.stringify({ error: 'Unknown error' }), {status: 500});
                }
            }
        } else {
            // If the user is not an admin, return a specific response
            return new Response(JSON.stringify({ message: 'Unauthorized' }), {status: 401});
        }
    } else {
        if (body.isAdmin) {
            try {
                const result = await prisma.user.findFirst({
                    where: {
                        id: userid,
                    },
                    include: {
                        timebalance: true,
                        timerequests: true,
                        
                    },
                });
                if (result) {
                    const userWithoutPassword = {
                        ...result,
                        password: undefined,
                    }
                    return new Response(JSON.stringify(userWithoutPassword));
                }                
            } catch (error) {
                console.error(error);
                // Narrow down the type of the error object
                if (error instanceof Error) {
                    return new Response(JSON.stringify({ error: error.message }), {status: 500});
                } else {
                    // If the error is not an Error instance, handle it differently
                    console.error('Unexpected error type:', error);
                    return new Response(JSON.stringify({ error: 'Unknown error' }), {status: 500});
                }
            }
        }
    }

    // If none of the conditions above are met, return an appropriate response
    return new Response(JSON.stringify({ message: 'Invalid request' }), {status: 400});
}