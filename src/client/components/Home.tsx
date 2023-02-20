import { useState } from "react";
import { useSession } from "../context/SessionContext";
import PicCard from "./PictureCard";
import { Link } from "react-router-dom";
import Picture from "./PictureModal";
import PictureGrid from "./PictureGrid";

export default function Home() {
  const { session } = useSession();
  const [pictures, setPictures] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=948&q=80",
      title: "Plant 1",
      username: "Yaseen",
      date: "02/12/2023",
      added: true,
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=810&q=80",
      title: "Plant 2",
      username: "Nala",
      date: "15/10/2023",
      added: false,
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      title: "Plant 3",
      username: "Nirvana",
      date: "01/09/2023",
      added: false,
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1531875456634-3f5418280d20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
      title: "Plant 4",
      username: "Solomon",
      date: "12/0/2023",
      added: false,
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1508013861974-9f6347163ebe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80",
      title: "Plant 5",
      username: "Nala",
      date: "02/03/2023",
      added: false,
    },
  ]);

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
      <PictureGrid pictures={pictures} />
    </>
  );
}
