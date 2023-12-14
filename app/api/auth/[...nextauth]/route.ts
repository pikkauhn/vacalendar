import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "Enter User" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              const res = await fetch("/api/login", {
                method:"POST",
                headers:{
                  "Content-Type": "application/json",
                },
                body:JSON.stringify({
                  username: credentials?.username,
                  password: credentials?.password
                }),
              });

              const user = await res.json();
        
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          })
    ],
    callbacks:{
      async jwt({token, user}){
        return({...token,...user})
      },

      async session({session,token}){
        session.user = token as any;
        return session
      }
    }
};

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}