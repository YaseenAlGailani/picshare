import { useContext, createContext, ReactNode, useState } from "react";

interface Session {
  loggedIn: boolean;
  username: string;
}

interface SessionContext {
  session: Session;
  login: (session: Session) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContext | null>(null);

interface Props {
  children: ReactNode;
}

function SessionProvider({ children }: Props) {
  const initialValue = { loggedIn: false, username: "" };
  const key = "session";
  const [session, setSession] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const login = (newSession: Session) => {
    setSession(newSession);
    try {
      window.localStorage.setItem(key, JSON.stringify(newSession));
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setSession(initialValue);
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

function useSession() {
  const value = useContext(SessionContext);

  if (!value) {
    throw new Error("useSession needs to be used within sessionProvider");
  }

  return value;
}

export { SessionProvider, useSession };
