import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import PictureGrid from "./PictureGrid";

export default function Favourites() {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.loggedIn) {
      navigate("/login");
    }
  }, []);

  const url = `http://localhost:3000/favourites/pictures/${session.username}`

  return session.loggedIn ? (
    <>
      <h1 className="mb-5 font-bold">Your Saved Pictures</h1>
      <PictureGrid url={url} />
    </>
  ) : (
    <p>Redirecting to login page</p>
  );
}
