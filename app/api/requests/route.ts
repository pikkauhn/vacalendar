import prisma from "@/app/lib/prisma";

interface RequestBody {
   id: number;
   status: string;
   notes: string;
}

export async function POST(request: Request){
    const body:RequestBody = await request.json();

    const timeOffRequest = await prisma.timeOffRequest.update({
        where: {
            id: body.id,
        },
        data:{            
            status: body.status,
            notes: body.notes,
        },
    });


    return new Response(JSON.stringify(timeOffRequest));
}