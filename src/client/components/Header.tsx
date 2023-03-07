import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { Logo } from "./Logo";
import Nav from "./Nav";
import SessionNav from "./SessionNav";

interface Props {
  openShareModal: () => void;
}

export default function Header({ openShareModal }: Props) {
  const { session, logout } = useSession();

  return (
    <div className="flex w-full items-center justify-between mx-auto">
      <div className="mr-5 lg:mr-16">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {session.loggedIn ? (
        <SessionNav
          sharePic={openShareModal}
          logout={logout}
          username={session.username}
        />
      ) : (
        <Nav />
      )}
    </div>
  );
}
