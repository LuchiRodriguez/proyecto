import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";
import Challenges from "../pages/Challenges";
import Ranking from "../components/Ranking";
import VisitChallenge from "../pages/VisitChallenge";
import NotFoundPage from "../pages/NotFoundPage";
import GlobalStyleWrapper from "../components/GlobalStyleWrapper";

const AppRoutes = () => {
  const location = useLocation();
  return (
    <>
      <GlobalStyleWrapper location={location} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/visit/:id" element={<VisitChallenge />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
const Router = () => {


  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default Router;

