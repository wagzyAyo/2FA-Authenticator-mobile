import { useState, useContext, useEffect } from "react"
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Alert, ScrollView } from "react-native"
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext, BiometricContext } from "../components/Theme";
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen ({navigation}) {
    const {themeMode} = useContext(ThemeContext);
    const {allowBiometric} = useContext(BiometricContext);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordVisible, setPasswordVisible] = useState("false");
const [isBiometricSupported, setIsBiometricSupported] = useState(false)

const styles = getStyles(themeMode)
const handleLogin = async ()=>{
    if (email && password){
        try {
            const response = await fetch('https://twofa-authenticator.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })
            const data = await response.json();
            console.log('Response', response.status, data);
            console.log({email, password})
            if (response.status == 200){
                //console.log(data)
                await AsyncStorage.setItem('token', JSON.stringify(data.message))
                Alert.alert('login successful')
                navigation.navigate('Home')
            }else{
                Alert.alert(`Login fail: ${data.message}`)
            }
        } catch (err) {
            Alert.alert(`Error: ${err}`)
        }
    }else{
        Alert.alert("Enter both Email and Password")
    }
};

const fallbackDefault = ()=>{
    Alert.alert('Login with password')
}

useEffect(() => {
    (async () => {
        try {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();
            console.log("Biometric supported:", compatible, "Enrolled:", enrolled);
        } catch (error) {
            console.error("Biometric Check Error:", error);
            Alert.alert("Error with biometric setup:", error.message);
        }
    })();
}, []);


const handleBioAuth = async () => {
    if(allowBiometric){
        try {
            const savedBiometric = await LocalAuthentication.isEnrolledAsync();
            console.log('Enrolled:', savedBiometric);
            if (!savedBiometric) {
                return Alert.alert(
                    "Biometric record not found",
                    "Please verify your identity with your password",
                    [{ text: "OK" }]
                );
            }
    
            const bioAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with your fingerprint',
                disableDeviceFallback: false,
            });
    
            console.log("Authentication Result:", bioAuth);
    
            if (bioAuth.success) {
                Alert.alert("Biometric authentication successful!");
                navigation.navigate('Home');
            } else {
                Alert.alert("Authentication failed. Please try again.");
            }
        } catch (error) {
            console.error("Biometric Auth Error:", error);
            Alert.alert("Error with biometric authentication:", error.message);
        }
    }else{
        Alert.alert(`Biometric access not granted for this app`)
    }
}
    


    
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.logoContainer}>
                
            <Image source={require('../../assets/alpha.png')} style={styles.logoImg}/>
            </View>
           
            <Text style={styles.title}>Login into your account</Text>
            <TextInput style={styles.input} 
              placeholderTextColor={themeMode ? COLORS.background : COLORS.surface}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputPassword} 
                placeholderTextColor={themeMode ? COLORS.background : COLORS.surface}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!passwordVisible}
                />
                 <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                >
                    <MaterialIcons
                        name={passwordVisible ? "visibility" : "visibility-off"}
                        size={24}
                        color={themeMode ? COLORS.background : COLORS.surface}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.fingerPrint}>
                <TouchableOpacity onPress={handleBioAuth}>
                   <MaterialIcons  name="fingerprint" size={26} color={themeMode ? COLORS.background : COLORS.surface}/>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={styles.option}>
                or
            </Text>

            <View>
                <TouchableOpacity style={styles.btnStroke}>
                    <Image source={require('../../assets/googleIcon.png')} style={styles.icon}/>
                    <Text style={styles.btnTextStroke}>Continue with google</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.navSignup} onPress={()=> navigation.navigate('SignUp')}>
                Dont have an account? signup
            </Text>
            </ScrollView>
        </View>
    )
}

const getStyles = (themeMode)=> StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
        padding: 16,
    },
    logoContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    logoImg: {
        width: 45,
        height: 48,
        
    },
    title: {
        marginTop: 16,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        letterSpacing: 0.15,
        color: themeMode ? COLORS.background : COLORS.surface,
    },
    input: {
        marginTop: 24,
        borderWidth: 1,
        width: SIZES.width - 32,
        borderColor: COLORS.primary,
        borderRadius: 10,
        padding: 16,
        color: themeMode ? COLORS.background : COLORS.surface,
    },
    inputContainer: {
        width: SIZES.width - 32,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingRight: 10,
        borderRadius: 10,
        marginTop: 24,
    },
    
    inputPassword: {
        flex: 1,
        padding: 16,
        color: themeMode ? COLORS.background : COLORS.surface,
    },

    eyeIcon: {
        color: themeMode ? COLORS.background : COLORS.surface,
        position: "absolute",
        right: 10,
        top: 20,
    },
    fingerPrint: {
        color: themeMode ? COLORS.background : COLORS.surface,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    btn: {
        width: SIZES.width - 32,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    btnText: {
        fontSize: SIZES.button,
        letterSpacing: 1.25,
        color: COLORS.background,
        textAlign: 'center'
    },
    option: {
        color: themeMode ? COLORS.background : COLORS.surface,
        marginTop: 24,
        textAlign: 'center'
    },
    btnStroke: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: SIZES.width - 32,
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 8,
        color: COLORS.surface,
        marginTop: 24
    },
    icon: {
        width: 15,
        height: 13,
    },
    btnTextStroke: {
        color: themeMode ? COLORS.background : COLORS.surface,
        display: 'flex',
        textAlign: 'center',
    },

    navSignup: {
        color: themeMode ? COLORS.background : COLORS.surface,
        textAlign: 'center',
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
        marginTop: 32,
    }
})