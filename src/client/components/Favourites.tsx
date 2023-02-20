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

  const [pictures, setPictures] = useState([
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=810&q=80",
      title: "Plant 2",
      username: "Nala",
      date: "15/10/2023",
      added: true,
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      title: "Plant 3",
      username: "Nirvana",
      date: "01/09/2023",
      added: true,
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=948&q=80",
      title: "Plant 4",
      username: "Solomon",
      date: "12/0/2023",
      added: true,
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1508013861974-9f6347163ebe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80",
      title: "Plant 5",
      username: "Nala",
      date: "02/03/2023",
      added: true,
    },
  ]);

  return session.loggedIn ? (
    <>
      <h1 className="mb-5 font-bold">Your Saved Pictures</h1>
      <PictureGrid pictures={pictures} />
    </>
  ) : (
    <p>Redirecting to login page</p>
  );
}
