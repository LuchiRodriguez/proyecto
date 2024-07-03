import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import Challenges from "../pages/Challenges";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/challenge" element={<Challenges />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
