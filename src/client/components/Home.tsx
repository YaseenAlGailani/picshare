import { useSession } from "../context/SessionContext";

export default function Home(){

  const {session} = useSession();

  return (
    <div>
      <h1>Home</h1>
      {session.loggedIn && (
        <p>Logged in as {session.username}</p>
      )}
    </div>
  );
}