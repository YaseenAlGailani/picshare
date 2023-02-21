import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import PictureGrid from "./PictureGrid";
import usePictureFetcher from "../hooks/usePicturesFetcher";
import { IPicture } from "../types";

export default function Favourites() {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.loggedIn) {
      navigate("/login");
    }
  }, []);

  const { status, data, forceRefetch } = usePictureFetcher(
    `http://localhost:3000/favourites/pictures/${session.username}`
  );

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "rejected") {
    return (
      <div>
        <p>Failed to load pictures!</p>
      </div>
    );
  }

  return session.loggedIn ? (
    <>
      <h1 className="mb-5 font-bold">Your Saved Pictures</h1>
      <PictureGrid
        refetch={forceRefetch}
        data={data as { ids: number[]; pictures: IPicture[] }}
      />
    </>
  ) : (
    <p>Redirecting to login page</p>
  );
}
