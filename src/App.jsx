import { GlobalStyle } from './app/Styles';
import UserProvider from './app/UserProvider';
import Router from "./app/Router";

<<<<<<< HEAD
const App = () => (
    <UserProvider>
        <GlobalStyle />
        <Router />
    </UserProvider>
);
=======
const App = () => {
    const { user } = UserHook();
    return <>{user ? <Router /> : <PublicRoutes />}</>;
};
>>>>>>> 1520c4af2394d6ebe4b269d7ecca37fb534758f4

export default App;
