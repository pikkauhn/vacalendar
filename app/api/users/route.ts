import prisma from "@/app/lib/prisma";

interface RequestBody {
    email: string;    
    isAdmin: boolean;
}


// Get all users
export async function POST(request: Request) {
    const body: RequestBody = await request.json();    
    
    if (body.isAdmin) {
        try {
            const result = await prisma.user.findMany();
            let userInfo = <any>[]
            result.map((data, idx) => {
                const {id, email, isAdmin, password, invite,  ...userWithoutPass} = result[idx];
                userInfo.push(userWithoutPass);
            })
            
            return new Response(JSON.stringify(userInfo));
        } catch (error) {
            console.log(error);
        }
    } else {
        return new Response(JSON.stringify(null));
    }
}
