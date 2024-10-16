import { useContext, useEffect, useState} from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
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
    
    return ({otp,expires})
   };


   const updateTimeRemaining = ()=>{
    const {expires, otp} = generateCode();
    setCode(otp);
    const currentTime = Date.now();
    const timeLeft = Math.floor((expires - currentTime) / 1000);
    setTimer(timeLeft)
    
    setTimer(time =>{
        if(time< 1){
            generateCode();
        }
        return time
    })
   }

   useEffect(()=>{
    updateTimeRemaining()
    const Interval = setInterval(updateTimeRemaining, 1000) //update time remaining every seconds

    return ()=> clearInterval(Interval)
   }, []);


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
                <Feather  name="user" size={30} 
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
                <View style={styles.circle}>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        left: SIZES.width /4,
        color: themeMode ? COLORS.background : COLORS.surface,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        letterSpacing: 0.15,
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
    },
    circle: {
        position: 'relative',
        width: 40, 
        height: 40,
        borderRadius: 50, 
        borderWidth: 5,
        borderColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },

})