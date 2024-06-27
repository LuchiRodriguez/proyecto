import Router from "./app/Router";
import PublicRoutes from "./app/PublicRoutes";
import { useUserContext } from "./app/UserProvider";

const App = () => {
  const [user] = useUserContext();
  return <>{user ? <Router /> : <PublicRoutes />}</>;
};

export default App;
