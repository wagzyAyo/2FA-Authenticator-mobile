import {createContext, useState, useEffect }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Create Theme context
export const ThemeContext = createContext();
export const AppContext = createContext();
export const AuthContext = createContext();
export const BiometricContext = createContext()

export const ThemeProvider = ({children})=> {
    const [themeMode, setThemeMode] = useState(false);
    const [showhome, setShowHome] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [allowBiometric, setAllowBiometric] = useState(false)

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

    const checkBiometrics = async ()=>{
        const biometric = await AsyncStorage.getItem('biometric');
        if (biometric){
            setAllowBiometric(true);
        }else{
            setAllowBiometric(false)
        }
    }

    useEffect(()=>{
        loadTheme();
        loadOnboarding();
        checkBiometrics();
    }, [])

    

    

    const toggleTheme = async ()=>{
        
        setThemeMode((prevMode) => {
            const newMode = !prevMode
         AsyncStorage.setItem('DarkMode', JSON.stringify(newMode))
         return newMode
      })
    }
    const toggleBiometric = async ()=>{
        
        setAllowBiometric((prevMode) => {
            const newMode = !prevMode
         AsyncStorage.setItem('biometric', JSON.stringify(newMode))
         return newMode
      })
    }

    return (
        <ThemeContext.Provider value={{themeMode, toggleTheme}}>
            <AppContext.Provider value={{setShowHome, showhome}}>
                <AuthContext.Provider value={{authenticated, setAuthenticated}}>
                    <BiometricContext.Provider value={{allowBiometric, setAllowBiometric, toggleBiometric}}>
                       {children}
                    </BiometricContext.Provider>
               </AuthContext.Provider>
            </AppContext.Provider>
           
        </ThemeContext.Provider>
    )

}