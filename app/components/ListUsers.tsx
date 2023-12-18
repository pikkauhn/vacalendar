import SessionInfo from '@/app/components/SessionInfo';

async function ListUsers(id: number) {
  const session = await SessionInfo();
  const userid = id;  
  try {
    console.log()
    const response = await fetch(process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({        
        userId: userid,
        email: session?.email,
        isAdmin: session?.isAdmin
      }),
      
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('ListUsers error:', error);
  }
}

export default ListUsers;
