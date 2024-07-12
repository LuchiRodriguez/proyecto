import PublicRoutes from "./app/PublicRoutes";
import Router from "./app/Router";
import UserHook from "./app/UserHook";
import Theme from "./components/Theme";

const App = () => {
  const { user } = UserHook();

  return (<Theme rol={user?.rol || "default"}>{user ? <Router /> : <PublicRoutes />}</Theme>)
};

export default App;
