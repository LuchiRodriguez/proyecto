// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "../pages/Home";
// import Profile from "../pages/Profile";
// import UserDetail from "../pages/UserDetail";
// import Challenges from "../pages/Challenges";
// import Ranking from "../components/Ranking";

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route index element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/profile/:username" element={<UserDetail />} />
//         <Route path="/challenges" element={<Challenges />} />
//         <Route path="/ranking" element={<Ranking />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Router;

// src/app/Router.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";  // Importa la nueva página
import Challenges from "../pages/Challenges";
import Ranking from "../components/Ranking";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<UserProfile />} />  {/* Nueva ruta */}
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

