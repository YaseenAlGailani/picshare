import AddButton from "./AddButton";
import { useSession } from "../context/SessionContext";
import { MouseEvent, KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  activated: (id: number) => void;
  id: number;
  url: string;
  title: string;
  date: string;
  username: string;
  added?: boolean;
  isFavourite: boolean;
  addToFavourites: (id: number) => void;
  removeFromFavourites: (id: number) => void;
}

export default function PictureCard({
  activated,
  id,
  url,
  title,
  date,
  username,
  added = false,
  isFavourite,
  addToFavourites,
  removeFromFavourites,
}: Props) {
  const { session } = useSession();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const cardClickHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    activated(id);
  };

  const cardKeyDownHandler = (event: KeyboardEvent<HTMLElement>) => {
    if (
      event.code === "Space" ||
      event.code === "Enter" ||
      event.code === "NumpadEnter"
    ) {
      event.stopPropagation();
      event.preventDefault();
      activated(id);
    }
  };

  return (
    <article
      onClick={cardClickHandler}
      onKeyDown={cardKeyDownHandler}
      tabIndex={0}
      className="p-2.5 w-full rounded-xl shadow-ps overflow-hidden border border-neutral-100 cursor-pointer"
    >
      <div className="relative flex mb-2.5 overflow-hidden before:pt-[100%]">
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full"
          src={url}
          alt=""
        />
      </div>
      <header className="mb-2.5">
        <h2 className="font-bold text-center">{title}</h2>
      </header>
      <div
        className={`flex items-start text-neutral-500 text-sm ${
          !session.loggedIn ? "justify-center text-center" : "justify-between"
        }`}
      >
        <div>
          <div className="">{username}</div>
          <time>{new Date(date).toLocaleDateString()}</time>
        </div>
        {session.loggedIn && (
          <AddButton
            initialAdded={isFavourite}
            remove={() => removeFromFavourites(id)}
            add={() => addToFavourites(id)}
          />
        )}
      </div>
    </article>
  );
}
