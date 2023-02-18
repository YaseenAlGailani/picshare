import { Routes, Route, Link } from "react-router-dom";
import Logo from "./components/Logo";
import Home from "./components/Home";
import Login from "./components/Login";
import Favourites from "./components/Favourites";
import PageNotFound from "./components/PageNotFound";

export function App() {
  return (
    <div>
      <header>
        <div>
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <nav>
            <Link to="/login">Login</Link>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}
