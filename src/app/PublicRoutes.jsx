import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login/:name" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
