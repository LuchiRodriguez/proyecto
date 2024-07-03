import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Challenges from "../pages/Challenges";
import CreateChallenge from "../pages/CreateChallenge";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/challenge" element={<Challenges />} />
        <Route path="/createChallenge" element={<CreateChallenge />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
