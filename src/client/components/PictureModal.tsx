import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IPicture } from "../types";
import useModal from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import CloseButton from "./CloseButton";

export default function PictureModal() {
  const [picture, setPicture] = useState<IPicture | null>(null);
  const { id } = useParams();
  const { getModalProps, labelId } = useModal({ initialIsOpen: true });
  const navigate = useNavigate();

  useEffect(() => {
    //fetch picture using id
    setPicture({
      id: 1,
      url: "https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=810&q=80",
      title: "Best plant of the day",
      date: "12/03/2023",
      username: "yaseen",
      added: false,
    });
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
        {picture && (
          <>
            <header className="flex items-center pb-2">
              <h2 id={labelId} className="mr-14">
                {picture.username}
              </h2>
              <time className="text-sm">{picture.date}</time>
            </header>
            <div className="h-[90vh] max-h-[1000px]">
              <div className="h-full w-full">
                <img
                  className="object-contain w-full h-full"
                  src={picture.url}
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
