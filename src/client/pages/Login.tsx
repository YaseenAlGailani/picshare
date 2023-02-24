import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "../components/Logo";
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
    if (Boolean(error.trim())) {
      setError("");
    }
    setUsername(event.target.value);
  };

  const handleFormSubmit: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!Boolean(username.trim())) {
      setError("Username cannot be empty");
      setUsername('');
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
            placeholder={error || "Username"}
            className={`input ${
              error ? "input-error" : ""
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
