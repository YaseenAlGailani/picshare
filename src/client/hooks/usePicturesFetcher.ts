import { useRef, useReducer, useState } from "react";
import { fetcher } from "../utils";
import { useSession } from "../context/SessionContext";
import type { IPicture } from "../types";

enum actionTypes {
  error = "ERROR",
  setPictures = "SET_PICTURES",
  setFavouriteIds = "SET_FAVOURITES_ID",
  setAll = "SET_PICTURES_AND_FAVOURITES_ID",
  fetching = "FETCHING",
}

interface PageInfo {
  hasNext: boolean;
  lastId: number;
}

interface State {
  status: string;
  error?: Error;
  favouriteIds?: number[];
  pictureData?: { pageInfo: PageInfo; pictures: IPicture[] };
}

type Action =
  | { type: actionTypes.error; error: Error }
  | {
      type: actionTypes.setPictures;
      pictureData: { pageInfo: PageInfo; pictures: IPicture[] };
    }
  | { type: actionTypes.setFavouriteIds; favouriteIds: number[] }
  | {
      type: actionTypes.setAll;
      favouriteIds: number[];
      pictureData: { pageInfo: PageInfo; pictures: IPicture[] };
    }
  | { type: actionTypes.fetching };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.error:
      return {
        ...state,
        status: "rejected",
        error: action.error,
      };
    case actionTypes.setPictures:
      return {
        ...state,
        status: "resolved",
        pictureData: action.pictureData,
      };
    case actionTypes.setFavouriteIds:
      return {
        ...state,
        status: "resolved",
        favouriteIds: action.favouriteIds,
      };
    case actionTypes.setAll:
      return {
        ...state,
        status: "resolved",
        favouriteIds: action.favouriteIds,
        pictureData: action.pictureData,
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

export default function usePictureFetcher(path: string) {
  const [isLazyLoading, setIsLazyLoading] = useState(false);
  const { session } = useSession();
  const [state, dispatch] = useReducer(reducer, {
    status: "pending",
  });
  const hasNextRef = useRef(true);
  const lastIdRef = useRef(0);

  const fetchAll = async () => {
    dispatch({ type: actionTypes.fetching });
    try {
      const [pictureData, favouriteIdsData] = await Promise.all([
        fetcher(path),
        fetcher(`/favourites/ids/${session.username}`),
      ]);

      const favouriteIds = Array.isArray(favouriteIdsData)
        ? extractIds(favouriteIdsData)
        : [];

      hasNextRef.current = pictureData.pageInfo.hasNext;
      lastIdRef.current = pictureData.pageInfo.lastId;

      dispatch({ type: actionTypes.setAll, pictureData, favouriteIds });
    } catch (error: any) {
      dispatch({ type: actionTypes.error, error });
    }
  };

  const fetchPictures = async () => {
    dispatch({ type: actionTypes.fetching });
    try {
      const pictureData = await fetcher(path);
      hasNextRef.current = pictureData.pageInfo.hasNext;
      lastIdRef.current = pictureData.pageInfo.lastId;
      dispatch({ type: actionTypes.setPictures, pictureData });
    } catch (error: any) {
      dispatch({ type: actionTypes.error, error });
    }
  };

  const fetchFavouriteIds = async () => {
    dispatch({ type: actionTypes.fetching });
    try {
      const data = await fetcher(`/favourites/ids/${session.username}`);
      const favouriteIds = extractIds(data);
      dispatch({ type: actionTypes.setFavouriteIds, favouriteIds });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.error, error });
    }
  };

  const scrollHandler = () => {
    const html = document.documentElement;
    const distanceToBottom =
      html.scrollHeight - (html.clientHeight + html.scrollTop);
    if (!hasNextRef.current || distanceToBottom > 10) {
      return;
    }
    setIsLazyLoading(true);
  };

  const fetchNextPictures = async () => {
    try {
      const url = lastIdRef.current
        ? `${path}?after=${lastIdRef.current}`
        : path;
      const data = await fetcher(url);
      const currentStatePictures = state.pictureData
        ? state.pictureData.pictures
        : [];
      const newPictureData = {
        pageInfo: data.pageInfo,
        pictures: [...currentStatePictures, ...data.pictures],
      };
      hasNextRef.current = data.pageInfo.hasNext;
      lastIdRef.current = data.pageInfo.lastId;
      dispatch({
        type: actionTypes.setPictures,
        pictureData: newPictureData,
      });
      setIsLazyLoading(false);
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.error, error });
      setIsLazyLoading(false);
    }
  };

  return {
    status: state.status,
    error: state.error,
    pictures: state.pictureData?.pictures,
    favouriteIds: state.favouriteIds,
    fetchPictures,
    fetchFavouriteIds,
    fetchAll,
    fetchNextPictures,
    scrollHandler,
    isLazyLoading,
    hasNext: hasNextRef.current,
  };
}

const extractIds = (data: any) =>
  data.reduce((array: number[], obj: any) => {
    array.push(obj["pictureId"]);
    return array;
  }, []);
