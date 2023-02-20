import { useNavigate, Outlet } from "react-router-dom";
import PictureCard from "./PictureCard";
import type { IPicture } from "../types";

interface Props {
  pictures: IPicture[];
}

export default function PictureGrid({ pictures }: Props) {
  const navigate = useNavigate();

  const viewPicture = (id: number) => {
    navigate(`pictures/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {pictures.map((picture) => (
          <PictureCard key={picture.id} activated={viewPicture} {...picture} />
        ))}
      </div>
      <Outlet />
    </>
  );
}
