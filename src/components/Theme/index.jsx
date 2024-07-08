import { ThemeProvider } from "styled-components";
import { playerTheme } from "./themes/playerTheme";
import { watcherTheme } from "./themes/watcherTheme";


const Theme = ({ children, rol }) => {
    const themeToUse = rol === "player" ? playerTheme : watcherTheme;

    return (
        <ThemeProvider theme={themeToUse}>
            {children}
        </ThemeProvider>);
}; export default Theme;