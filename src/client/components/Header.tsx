import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import Logo from "./Logo";
import Nav from "./Nav";
import SessionNav from "./SessionNav";

export default function Header() {
  const { session, logout } = useSession();

  return (
    <div className="flex container items-center mx-auto">
      <div className="mr-20">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {session.loggedIn ? (
        <SessionNav logout={logout} username={session.username} />
      ) : (
        <Nav />
      )}
    </div>
  );
}
