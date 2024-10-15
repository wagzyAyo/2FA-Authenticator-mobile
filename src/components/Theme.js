import {createContext, useState, useEffect }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Create Theme context
export const ThemeContext = createContext()

export const ThemeProvider = ({children})=> {
    const [themeMode, setThemeMode] = useState(false);

    const loadTheme = async()=>{
        const savedTheme = await AsyncStorage.getItem('DarkMode')
        if(savedTheme !== null){
            setThemeMode(JSON.parse(savedTheme))
        }
    }

    useEffect(()=>{
        loadTheme();
    }, [])

    

    

    const toggleTheme = async ()=>{
        
        setThemeMode((prevMode) => {
            const newMode = !prevMode
         AsyncStorage.setItem('DarkMode', JSON.stringify(newMode))
         return newMode
      })
    }

    return (
        <ThemeContext.Provider value={{themeMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}