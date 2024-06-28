import { GlobalStyle } from './app/Styles';
import UserProvider from './app/UserProvider';
import Router from "./app/Router";



const App = () => {
    const { user } = UserHook();
    return <>{user ? <Router /> : <PublicRoutes />}</>;
};


export default App;
