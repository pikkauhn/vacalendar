export {default} from 'next-auth/middleware'

export const config = {
    matcher: ["/Landing/:path*", "/Admin/:path*"]
}