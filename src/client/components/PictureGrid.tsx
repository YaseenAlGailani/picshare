import { useNavigate, Outlet, useLocation } from "react-router-dom";
import PictureCard from "./PictureCard";
import { IPicture } from "../types";
import { useSession } from "../context/SessionContext";
import { useRef } from "react";

interface Props {
  data: { ids: number[]; pictures: IPicture[] };
  refetch?:()=>void;
}

export default function PictureGrid({ data, refetch }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { session } = useSession();
  const viewPicture = (id: number) => {
    navigate(`pictures/${id}`);
  };

  const justIds: number[] = data.ids?.reduce((array: number[], obj: any) => {
    array.push(obj["pictureId"]);
    return array;
  }, []);

  const isFavourite = (id: number) => {
    return justIds?.includes(id);
  };

  const save = async (id: number) => {
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

  const remove = async (id: number) => {
    const url = `http://localhost:3000/favourites/${session.username}/${id}`;
    try {
      await fetch(url, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }

    if (pathname.split("/").pop() === "favourites") {
      navigate("/favourites");
      refetch && refetch();
    }
  };

  if(data.pictures.length <=0){
    return <div className="bg-ps_neutral-100 rounded-xl p-4 text-center">
      <p>There are no pictures yet!</p>
    </div>
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.pictures!.map((picture) => (
          <PictureCard
            key={picture.id}
            activated={viewPicture}
            isFavourite={isFavourite(picture.id)}
            save={save}
            remove={remove}
            {...picture}
          />
        ))}
      </div>
      <Outlet />
    </>
  );
}
