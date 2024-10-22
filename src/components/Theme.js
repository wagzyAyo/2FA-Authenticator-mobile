import {createContext, useState, useEffect }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Create Theme context
export const ThemeContext = createContext();
export const AppContext = createContext();
export const AuthContext = createContext();

export const ThemeProvider = ({children})=> {
    const [themeMode, setThemeMode] = useState(false);
    const [showhome, setShowHome] = useState(loadOnboarding);
    const [authenticated, setAuthenticated] = useState(false);

    const loadTheme = async()=>{
        const savedTheme = await AsyncStorage.getItem('DarkMode')
        if(savedTheme !== null){
            setThemeMode(JSON.parse(savedTheme))
        }
    };

    const loadOnboarding = async ()=>{
        const onboarding = await AsyncStorage.getItem('Home');

        if(onboarding != null){
            setShowHome(true)
        }
    };

    const loadAuth = async ()=>{
        try {
            const token = await AsyncStorage.getItem('token');
            setAuthenticated(!!token);
            console.log(token)
        } catch (err) {
            console.log('Error retrieving token');
        }
        ;
    }

    useEffect(()=>{
        loadTheme();
        loadOnboarding();
        loadAuth();
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
            <AppContext.Provider value={{setShowHome, showhome}}>
                <AuthContext.Provider value={{authenticated, setAuthenticated}}>
               {children}
               </AuthContext.Provider>
            </AppContext.Provider>
           
        </ThemeContext.Provider>
    )

}