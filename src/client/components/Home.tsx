import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";
import PictureGrid from "./PictureGrid";

export default function Home() {
  const { session } = useSession();

  const url = "http://localhost:3000/pictures";  

  return (
    <>
      {!session.loggedIn && (
        <div className="mb-5 py-3 bg-ps_neutral-100 rounded-xl">
          <p className="text-center">
            <Link to="/login" className="text-ps_blue">
              Login
            </Link>{" "}
            to start sharing your favourite pictures with others!
          </p>
        </div>
      )}
      <PictureGrid url={url} />
    </>
  );
}
