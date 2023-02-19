import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Favourites from "./components/Favourites";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";

export function App() {
  return (
    <div className="flex flex-col min-h-screen bg-ps_neutral-50">
      <header className="flex items-center h-16 mb-8 bg-white ">
        <Header />
      </header>
      <main className="flex flex-1 flex-col mx-auto w-full max-w-ps">
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
