import nextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            employeeId: number;
            dept: string;
            firstname: string;
            email: string;            
            accessToken: string;
            isAdmin: boolean;
        };
    }
}