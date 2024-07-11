import { useAuth } from "@clerk/clerk-react"

const Protected = () => {
    const {isLoaded, userId} = useAuth();
    console.log(isLoaded, userId);

  return (
    <div>Protected</div>
  )
}

export default Protected