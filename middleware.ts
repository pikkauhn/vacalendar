export {default} from 'next-auth/middleware'

export const config = {        
    matcher: ["/Calendar/:path*", "/Requests/:path*", "/Admin/:path*"]
}