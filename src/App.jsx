import { GlobalStyle } from './app/Styles';
import UserProvider from './app/UserProvider';
import Router from "./app/Router";

const App = () => (
    <UserProvider>
        <GlobalStyle />
        <Router />
    </UserProvider>
);

export default App;