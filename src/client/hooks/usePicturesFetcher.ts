import { useEffect, useReducer, useState } from "react";
import type { IPicture } from "../types";

enum actionTypes {
  error = "ERROR",
  success = "SUCCESS",
  fetching = "FETCHING",
}

interface State {
  status: string;
  error?: Error;
  data?: { ids: number[]; pictures: IPicture[] };
}

type Action =
  | { type: actionTypes.error; error: Error }
  | { type: actionTypes.success; data: { ids: number[]; pictures: IPicture[] } }
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
        data: action.data,
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

export default function usePictureFetcher(url: string) {
  const [state, dispatch] = useReducer(reducer, {
    status: "pending",
  });

  const [refetch, setRefetch] = useState(true);

  const forceRefetch = () => {
    setRefetch(!refetch)
  };

  const fetchPictures = async () => {
    dispatch({ type: actionTypes.fetching });
    try {
      const response = await fetch(url);

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
      const data = await response.json();
      dispatch({ type: actionTypes.success, data });
    } catch (error: any) {
      dispatch({ type: actionTypes.error, error });
    }
  };

  useEffect(() => {
    fetchPictures();
  }, [refetch]);

  return {
    status: state.status,
    error: state.error,
    data: state.data,
    forceRefetch
  };
}
