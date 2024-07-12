import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import NewLanding from "../pages/NewLanding";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<NewLanding />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
