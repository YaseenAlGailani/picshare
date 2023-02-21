import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Favourites from "./components/Favourites";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
import PictureModal from "./components/PictureModal";
import useModal from "./hooks/useModal";
import SharePictureModal from "./components/SharePictureModal";

export function App() {

  const { isOpen, openModal, ...modalProps } = useModal();

  return (
    <div className="flex flex-col min-h-screen bg-ps_neutral-50">
      <header className="flex items-center h-16 mb-8 px-2 md:px-4 lg:px-10 bg-white shadow-ps">
        <Header openShareModal={openModal} />
      </header>
      <main className="flex flex-1 flex-col mx-auto w-full max-w-ps px-2 md:px-4 lg:px-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/favourites" element={<Favourites />}>
            <Route path="pictures/:id" element={<PictureModal />} />
          </Route>
          <Route path="/" element={<Home shareModalOpen={isOpen as boolean} />}>
            <Route path="pictures/:id" element={<PictureModal />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      {isOpen && <SharePictureModal {...modalProps} />}
    </div>
  );
}