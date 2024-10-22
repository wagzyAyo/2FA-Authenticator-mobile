import { useContext } from "react";
import { ThemeContext } from "./Theme";
import { StatusBar } from 'expo-status-bar';

export default function CustomStatusBar() {
  // Accessing themeMode from ThemeContext
  const themeContext = useContext(ThemeContext);
  const { themeMode } = themeContext;

  return <StatusBar style={themeMode ? 'light' : 'dark'} />;
}
