import { ReactElement } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import useModal from "../hooks/useModal";

interface Props {
  username: string;
  logout: () => void;
  sharePic: () => void;
}

export default function SessionNav({ username, logout, sharePic }: Props) {
  const navigate = useNavigate();

  const LogoutClickHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <ResponsiveWrap>
      <nav className="flex flex-col sm:flex-row flex-1 items-center justify-between gap-8">
        <ul className="flex flex-col sm:grid sm:grid-flow-col gap-8 sm:gap-7 items-center justify-center">
          <li>
            <NavLink className="relative sm:py-6" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="relative sm:py-6" to="/favourites">
              Favourites
            </NavLink>
          </li>
        </ul>
        <ul className="flex flex-col sm:grid sm:grid-flow-col gap-8 sm:gap-7 items-center justify-center">
          <li>
            <button className="btn-s" onClick={sharePic}>
              Share Pic
            </button>
          </li>
          <li className="hidden sm:block text-neutral-500">Hi {username}</li>
          <li>
            <button onClick={LogoutClickHandler} className="text-ps_blue">
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </ResponsiveWrap>
  );
}

function ResponsiveWrap({ children }: { children: ReactElement }) {
  const isLargeView = useQuery("(min-width: 640px)");
  const { isOpen, getModalProps, closeModal, openModal } = useModal();

  if (isLargeView) {
    return children;
  }

  return (
    <>
      <button className="" onClick={openModal}>
        Menu
      </button>
      {isOpen && (
        <div
          onClick={closeModal}
          className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.8)] z-10"
        >
          <div
            {...getModalProps()}
            onClick={closeModal}
            className="flex items-center justify-center content-center relative w-screen max-w-xs h-1/2 bg-white p-4"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
