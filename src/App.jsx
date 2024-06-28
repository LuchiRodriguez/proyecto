import Router from "./app/Router";
import PublicRoutes from "./app/PublicRoutes";
import UserHook from "./app/UserHook";

const App = () => {
    const { user } = UserHook();
    return <>{user ? <Router /> : <PublicRoutes />}</>;
};

export default App;
