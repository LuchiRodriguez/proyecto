import PublicRoutes from "./app/PublicRoutes";
import Router from "./app/Router";
import UserHook from "./app/UserHook";

const App = () => {
  const { user } = UserHook();
  return <>{user ? <Router /> : <PublicRoutes />}</>;
};

export default App;
