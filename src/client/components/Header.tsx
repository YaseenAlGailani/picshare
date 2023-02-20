import { useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import Logo from "./Logo";
import Nav from "./Nav";
import SessionNav from "./SessionNav";
import useModal from "../hooks/useModal";
import SharePictureModal from "../components/SharePictureModal";

export default function Header() {
  const { session, logout } = useSession();
  const { isOpen, openModal, ...modalProps } = useModal();

  return (
    <>
      <div className="flex w-full items-center justify-between mx-auto">
        <div className="mr-5 lg:mr-16">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {session.loggedIn ? (
          <SessionNav
            sharePic={openModal}
            logout={logout}
            username={session.username}
          />
        ) : (
          <Nav />
        )}
      </div>
      {isOpen && <SharePictureModal {...modalProps} />}
    </>
  );
}