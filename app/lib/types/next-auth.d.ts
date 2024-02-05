import nextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            employeeId: number;
            firstname: string;
            email: string;            
            accessToken: string;
            isAdmin: boolean;
        };
    }
}