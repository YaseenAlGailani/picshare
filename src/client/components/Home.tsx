import { useEffect, useReducer } from "react";
import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";
import PictureGrid from "./PictureGrid";
import { IPicture } from "../types";

enum actionTypes {
  error = "ERROR",
  success = "SUCCESS",
  fetching = "FETCHING",
}

interface State {
  status: string;
  error?: Error;
  pictures?: IPicture[];
}

type Action =
  | { type: actionTypes.error; error: Error }
  | { type: actionTypes.success; pictures: IPicture[] }
  | { type: actionTypes.fetching };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.error:
      return {
        ...state,
        status: "rejected",
        error: action.error,
      };
    case actionTypes.success:
      return {
        ...state,
        status: "resolved",
        pictures: action.pictures,
      };
    case actionTypes.fetching:
      return {
        ...state,
        status: "pending",
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}
export default function Home() {
  const { session } = useSession();

  const [state, dispatch] = useReducer(reducer, {
    status: "pending",
  });

  const fetchPictures = async () => {
    dispatch({ type: actionTypes.fetching });
    try {
      const response = await fetch("http://localhost:3000/pictures/");

      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new Error("Bad request");
          case 404:
            throw new Error("Not found");
          default:
            throw new Error("Unhandled error status");
        }
      }
      const pictures = await response.json();
      dispatch({ type: actionTypes.success, pictures });
    } catch (error: any) {
      dispatch({ type: actionTypes.error, error });
    }
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  if (state.status === "pending") {
    return <p>Loading...</p>;
  }

  if (state.status === "rejected") {
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
      <PictureGrid pictures={state.pictures as IPicture[]} />
    </>
  );
}
