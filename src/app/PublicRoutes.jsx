import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import NewLanding from "../pages/NewLanding";
import VisitChallenge from "../pages/VisitChallenge";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<NewLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visit/:id" element={<VisitChallenge />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
