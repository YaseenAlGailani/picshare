import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import type { IPicture } from "../types";
import useModal from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import CloseButton from "./CloseButton";

enum actionTypes {
  error = "ERROR",
  success = "SUCCESS",
  fetching = "FETCHING",
}

interface State {
  status: string;
  error?: Error;
  picture?: IPicture;
}

type Action =
  | { type: actionTypes.error; error: Error }
  | { type: actionTypes.success; picture: IPicture }
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
        picture: action.picture,
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

export default function PictureModal() {
  const [state, dispatch] = useReducer(reducer, {
    status: "pending",
  });

  const { id } = useParams();
  const { getModalProps, labelId } = useModal({ initialIsOpen: true });
  const navigate = useNavigate();

  const fetchPicture = async () => {
    dispatch({ type: actionTypes.fetching });
    try {
      const response = await fetch(`http://localhost:3000/pictures/${id}`);

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
      const picture = await response.json();
      dispatch({ type: actionTypes.success, picture });
    } catch (error: any) {
      dispatch({ type: actionTypes.error, error });
    }
  };

  useEffect(() => {
    fetchPicture();
  }, []);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={closeModal}
      className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.8)] z-10"
    >
      <div
        {...getModalProps()}
        className="relative w-screen max-w-6xl bg-black text-white pt-2 px-3"
      >
        <CloseButton
          clicked={closeModal}
          className="w-7 h-7 absolute right-2 "
        />
        {state.picture && (
          <>
            <header className="flex items-center pb-2">
              <h2 id={labelId} className="mr-14">
                {state.picture.username}
              </h2>
              <time className="text-sm">{new Date(state.picture.date).toLocaleDateString()}</time>
            </header>
            <div className="h-[90vh] max-h-[1000px]">
              <div className="h-full w-full">
                <img
                  className="object-contain w-full h-full"
                  src={state.picture.url}
                  alt=""
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
