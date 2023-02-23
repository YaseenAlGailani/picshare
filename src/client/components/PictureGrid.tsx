import { useNavigate, Outlet, useLocation } from "react-router-dom";
import PictureCard from "./PictureCard";
import { useSession } from "../context/SessionContext";
import usePictureFetcher from "../hooks/usePicturesFetcher";
import { useEffect } from "react";

interface Props {
  url: string;
}

export default function PictureGrid({ url }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { session } = useSession();

  const {
    status,
    pictures,
    favouriteIds,
    fetchAll,
    fetchPictures,
    fetchNextPictures,
    scrollHandler,
    isLazyLoading,
  } = usePictureFetcher(url);

  const viewPicture = (id: number) => {
    navigate(`pictures/${id}`);
  };

  const checkFavourite = (id: number) => {
    return favouriteIds?.includes(id) || false;
  };

  const addToFavourites = async (id: number) => {
    const data = {
      id,
      username: session.username,
    };
    try {
      await fetch("http://localhost:3000/favourites", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromFavourites = async (id: number) => {
    const url = `http://localhost:3000/favourites/${id}/${session.username}`;
    try {
      await fetch(url, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
    if (pathname.split("/").pop() === "favourites") {
      fetchAll();
    }
  };

  useEffect(() => {
    session.loggedIn ? fetchAll() : fetchPictures();
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (!isLazyLoading) return;
    fetchNextPictures();
  }, [isLazyLoading]);

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

  if (!Boolean(pictures?.length)) {
    return (
      <div className="bg-ps_neutral-100 rounded-xl p-4 text-center">
        <p>There are no pictures yet!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {pictures?.map((picture) => (
          <PictureCard
            key={picture.id}
            activated={viewPicture}
            isFavourite={checkFavourite(picture.id)}
            addToFavourites={addToFavourites}
            removeFromFavourites={removeFromFavourites}
            {...picture}
          />
        ))}
      </div>
      <Outlet />
    </>
  );
}
