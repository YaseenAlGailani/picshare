import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "./Logo";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login } = useSession();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (Boolean(error)) {
      setError("");
    }
    setUsername(event.target.value);
  };

  const handleFormSubmit: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
    if (username === "") {
      setError("Please enter a username");
      return;
    }
    login({
      loggedIn: true,
      username,
    });
    navigate('/')
  };

  useEffect(()=>{
    inputRef.current?.focus();
  })

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-ps mx-auto bg-white mb-8">
      <div className="mb-3">
        <Logo />
      </div>
      <h1 className="mb-5 text-neutral-500">Login to start sharing</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
        <div className="relative mb-5">
          <label htmlFor="username" className="sr-only">
            Enter username
          </label>
          <input
            ref={inputRef}
            id="username"
            type="text"
            value={username}
            aria-required={true}
            placeholder={"Username"}
            className={`w-56 border rounded-sm py-1.5 px-3 h-8 text-sm outline-none ring-offset-2 ${
              error ? "border-red-500 focus:ring-red-500 focus:ring-2 placeholder:text-red-600" : "border-ps_neutral-100 focus:ring-2 focus:ring-ps_blue"
            }`}
            onChange={handleInputChange}
          />
          {Boolean(error) && (
            <div className="sr-only" role="alert">
              <p>{error}</p>
            </div>
          )}
        </div>
        <button type="submit" className="btn-p">
          Log In
        </button>
      </form>
    </div>
  );
}
