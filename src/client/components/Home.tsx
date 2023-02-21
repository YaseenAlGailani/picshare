import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";
import PictureGrid from "./PictureGrid";
import usePictureFetcher from "../hooks/usePicturesFetcher";
import { IPicture } from "../types";

export default function Home() {
  const { session } = useSession();

  const url = session.loggedIn
    ? `http://localhost:3000/pictures/user/${session.username}`
    : "http://localhost:3000/pictures";

  const { status, data } = usePictureFetcher(url);

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
      <PictureGrid data={data as { ids: number[]; pictures: IPicture[] }} />
    </>
  );
}
