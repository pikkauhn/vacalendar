import nextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            firstname: string;
            email: string;            
            accessToken: string;
            isAdmin: boolean;
        };
    }
}