import { useEffect } from "react";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import PictureGrid from "../components/PictureGrid";

export default function Favourites() {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.loggedIn) {
      navigate("/login");
    }
  }, []);

  return session.loggedIn ? (
    <>
      <h1 className="mb-5 font-bold">Your Saved Pictures</h1>
      <PictureGrid path={`/favourites/pictures/${session.username}`} />
    </>
  ) : (
    <p>Redirecting to login page</p>
  );
}
