import { useContext } from "react";
import { ThemeContext } from "./Theme";
import { StatusBar } from 'expo-status-bar';

export default function CustomStatusBar() {
  const { themeMode } = useContext(ThemeContext);

  return <StatusBar style={themeMode ? 'light' : 'dark'} />;
}