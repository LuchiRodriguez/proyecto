import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import Challenges from "../pages/Challenges";
import CreateChallenge from "../pages/CreateChallenge";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/createChallenge" element={<CreateChallenge />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
