import { useEffect } from "react";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

export default function Favourites() {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.loggedIn) {
      navigate("/login");
    }
  }, []);

  return session.loggedIn ? (
    <div>
      <h1>Saved Images</h1>
    </div>
  ) : (
    <p>Redirecting to login page</p>
  );
}
