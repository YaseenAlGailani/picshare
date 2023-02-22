import { ChangeEvent, useState, FormEvent, FormEventHandler } from "react";
import CloseButton from "./CloseButton";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

interface Props {
  refreshGrid: () => void;
  closeModal: () => void;
  getModalProps: any;
  labelId: string;
}

export default function SharePictureModal({
  refreshGrid,
  closeModal,
  getModalProps,
  labelId,
}: Props) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const { session } = useSession();
  const navigate = useNavigate();

  const handleURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    setUrlError("");
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError("");
  };

  const validate = () => {
    let isValid = true;
    let urlRegex = RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

    if (!Boolean(url.trim())) {
      setUrlError("URL cannot be empty");
      isValid = isValid && false;
    } else if (!urlRegex.test(url)) {
      setUrlError("Please enter a valid URL");
      setUrl("");
      isValid = isValid && false;
    }

    if (!Boolean(title.trim())) {
      setTitleError("Title cannot be empty");
      setTitle("");
      isValid = isValid && false;
    }

    return isValid;
  };

  const handleFormSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const data = {
      url,
      username: session.username,
      title,
      date: new Date(),
    };

    try {
      await fetch("http://localhost:3000/pictures", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      navigate("/");
      refreshGrid();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.8)] z-10"
      onClick={closeModal}
    >
      <div
        {...getModalProps()}
        id="modal"
        className="relative border border-neutral-100 w-full max-w-lg bg-white shadow-lg"
      >
        <form onSubmit={handleFormSubmit}>
          <header className="flex  justify-between border-b border-ps_neutral-100 px-6 py-4">
            <h2 id={labelId} className="font-semibold">
              Share A New Picture
            </h2>
            <CloseButton color="#555" clicked={closeModal} />
          </header>
          <div className="flex flex-col items-center px-6 py-6 text-ps_neutral-200">
            <div className="mb-2.5">
              <label htmlFor="url" className="sr-only">
                New Picture URL
              </label>
              <input
                id="url"
                aria-required={true}
                type="text"
                value={url}
                placeholder={urlError || "New Picture URL"}
                className={`input ${urlError ? "input-error" : ""}`}
                onChange={handleURLChange}
              />
              {Boolean(urlError) && (
                <div className="sr-only" role="alert">
                  <p>{urlError}</p>
                </div>
              )}
            </div>
            <div className="mb-2.5">
              <label htmlFor="title" className="sr-only">
                New Picture URL
              </label>
              <input
                id="title"
                aria-required={true}
                type="text"
                value={title}
                placeholder={titleError || "Title"}
                className={`input ${titleError ? "input-error" : ""}`}
                onChange={handleTitleChange}
              />
              {Boolean(titleError) && (
                <div className="sr-only" role="alert">
                  <p>{titleError}</p>
                </div>
              )}
            </div>
          </div>
          <footer className="flex justify-end gap-2 border-t border-ps_neutral-100 px-6 py-4">
            <button type="button" className="btn-ps" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="btn-p">
              Share
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
