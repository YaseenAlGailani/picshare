import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  username: string;
  logout: () => void;
}

export default function SessionNav({ username, logout }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname.split("/").pop();

  const LogoutClickHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex flex-1 justify-between">
      <ul className="grid grid-flow-col gap-7">
        <li>
          <Link
            className={`relative py-6 ${
              activePage === ""
                ? "text-ps_blue after:absolute after:w-full after:h-0.5 after:bg-ps_blue after:bottom-0 after:left-0"
                : ""
            }`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`relative py-6 ${
              activePage === "favourites"
                ? "text-ps_blue after:absolute after:w-full after:h-0.5 after:bg-ps_blue after:bottom-0 after:left-0"
                : ""
            }`}
            to="/favourites"
          >
            Favourites
          </Link>
        </li>
      </ul>
      <ul className="grid grid-flow-col gap-7">
        <li>
          <Link to="/upload" className="btn-s">
            Share Pic
          </Link>
        </li>
        <li className="text-neutral-500">Hi {username}</li>
        <li>
          <button onClick={LogoutClickHandler} className="text-ps_blue">
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
