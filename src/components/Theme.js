import {createContext, useState }from 'react';

//Create Theme context
export const ThemeContext = createContext()

export const ThemeProvider = ({children})=> {
    const [themeMode, setThemeMode] = useState(false);

    const toggleTheme = ()=>{
        setThemeMode((prevMode) => !prevMode)
    }

    return (
        <ThemeContext.Provider value={{themeMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}