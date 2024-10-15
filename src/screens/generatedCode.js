import { useContext, useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../components/Theme";
import { COLORS, SIZES } from "../styles";
import {TOTP} from 'totp-generator'


export default function GenerateCode({navigation, route}){
    const {themeMode} = useContext(ThemeContext);
    const {appName, accountKey} = route.params

    const styles = getStyles(themeMode)
   const [timer, setTimer] = useState(30);
   const [code, setCode] = useState(TOTP.generate(String(accountKey)).otp);


   const generateCode = ()=>{
    const {otp, expires} = TOTP.generate(String(accountKey));
    setCode(otp);
   };


   const updateTimeRemaining = ()=>{
    
    setTimer(prevTime =>{
        if(prevTime < 1){
            generateCode();
            return 30;
        }
        return prevTime -1
    })
   }

   useEffect(()=>{
    updateTimeRemaining()
    const Interval = setInterval(updateTimeRemaining, 1000) //update time remaining every seconds

    return ()=> clearInterval(Interval)
   }, [])

    return (
        <View style={styles.container}>
            <MaterialIcons 
                name={'arrow-back'}
                size={24}
                color={themeMode ? COLORS.background : COLORS.surface}
                style={{marginTop: 50}}
                onPress={()=>(navigation.navigate('Home'))}
            />
            <View style={styles.title}>
            <View style={styles.user}>
                <MaterialIcons  name="person" size={30} 
                color={themeMode ? COLORS.surface : COLORS.background}/>
            </View>
                <Text style={styles.textTitle}>{appName}</Text>
            </View>
            <View style={styles.subTitle}>
                <MaterialIcons name="lock" size={24} color={themeMode ? COLORS.background : COLORS.surface}/>
                <Text style={styles.subTitleText}>Use this one-time password code
                generated to verify your sign-ins</Text>
            </View>

            <View style={styles.code}>
                <View>
                    <Text>{timer}</Text>
                </View>
                <View>
                    <Text style={styles.subTitleText}>One-time password code</Text>
                    <Text style={styles.codeText}>{code}</Text>
                </View>
            </View>
        </View>
    )
}

const getStyles = (themeMode) => StyleSheet.create({
    container: {
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
        flex: 1,
        padding: 16,
    },
    title: {
        marginTop: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        height: 48,
        width: 48,
        borderRadius: 50,
        backgroundColor: themeMode ? COLORS.background : COLORS.surface,
    },
    textTitle: {
        left: SIZES.width /4,
        color: themeMode ? COLORS.background : COLORS.surface,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
    },
    subTitle: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
    },
    subTitleText: {
        color: themeMode ? COLORS.background : COLORS.surface,
        width: SIZES.width / 2,
        textAlign:'left',
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
    },
    code: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 23,
    },
    codeText: {
        color: COLORS.secondary,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        letterSpacing: 0.15,
        marginTop: 16,
    }

})