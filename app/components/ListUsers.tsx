import SessionInfo from '@/app/components/SessionInfo';

async function ListUsers(employeeId: number) {
  const session = await SessionInfo();
  const userid = employeeId;  
  try {
    console.log()
    const response = await fetch(process.env.NEXT_NEXTAUTH_URL + "/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({        
        userId: userid,
        isAdmin: session?.isAdmin,
        dept: session?.dept
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
