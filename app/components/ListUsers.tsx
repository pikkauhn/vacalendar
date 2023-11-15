import SessionInfo from '@/app/components/SessionInfo'

async function ListUsers() {
  const session = await SessionInfo();
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.email,
          isAdmin: session?.isAdmin
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      return res.json();
    } catch (error) {
      console.log(error)
    }
  
}

export default ListUsers