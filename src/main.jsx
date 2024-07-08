
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./app/UserProvider.jsx";
import { GlobalStyle } from "./app/Styles.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

  <UserProvider>
    <GlobalStyle />
    <App />
  </UserProvider>

);
