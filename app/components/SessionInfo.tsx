'use server'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const SessionInfo = async () => {    
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (session) {
        return user
    } else {
        return null
    }
}

export default SessionInfo