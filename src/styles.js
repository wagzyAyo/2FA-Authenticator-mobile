import {useContext} from react
import { Dimensions } from "react-native";
import { ThemeContext } from "./components/Theme";

const {width , height } = Dimensions.get('screen');
const {themeMode, toggleTheme} = useContext(ThemeContext);


export const COLORS = {
    primary: "#0AADAD",
    secondary: "#3096BD",
    background: themeMode ?"#000000" : "FFFFFF",
    surface: themeMode ? "FFFFFF": "#000000",
}

export const SIZES = {
    h1: 33,
    h2: 23,
    h3: 19,
    bodyLarge: 16,
    bodySmall: 14,
    button: 14,
    caption: 12,

    width,
    height
}