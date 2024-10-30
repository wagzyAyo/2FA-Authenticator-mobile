import { useState, useContext } from "react"
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from "react-native"
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../components/Theme";

export default function SignUpScreen ({navigation}) {
    const {themeMode} = useContext(ThemeContext)

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordVisible, setPasswordVisible] = useState("false")
const [passwordVisible2, setPasswordVisible2] = useState("false")

const styles = getStyles(themeMode)
const handleSignup = async ()=>{
    if (email && password && confirmPassword){
        try {
            if (password == confirmPassword){
                const response = await fetch('https://twofa-authenticator.onrender.com/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                })
            
                const data = await response.json();
                if(response.status == 200){
                    //console.log(data)
                    await AsyncStorage.setItem(JSON.stringify(data.message))
                    Alert.alert('Account created!')
                    navigation.navigate('Home')
                }else{
                    Alert.alert('Sign up failed:', data.message)
                }
            }else{
                Alert.alert('Password do not match')
            }
        } catch (err) {
            Alert.alert('Error Signing up', err)
        }
    }else{
        Alert.alert('Email, Password and Confirm password fields are required')
    }
}
    
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image source={require('../../assets/alpha.png')} style={styles.logoImg}/>
            </View>
           
            <Text style={styles.title}>Create your account</Text>
            <TextInput style={styles.input} 
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholderTextColor={themeMode ? COLORS.background : COLORS.surface}
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

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputPassword} 
                placeholderTextColor={themeMode ? COLORS.background : COLORS.surface}
                placeholder="confirm Password"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={!passwordVisible2}
                />
                 <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setPasswordVisible2(!passwordVisible2)} // Toggle password visibility
                >
                    <MaterialIcons
                        name={passwordVisible2 ? "visibility-off" : "visibility"}
                        size={24}
                        color={themeMode ? COLORS.background : COLORS.surface}
                    />
                </TouchableOpacity>
            </View>
            
            

            <View>
                <TouchableOpacity style={styles.btn} onPress={handleSignup}>
                    <Text style={styles.btnText}>Sign up</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={styles.option}>
                or
            </Text>

            <View>
                <TouchableOpacity style={styles.btnStroke}>
                    <Image source={require('../../assets/googleIcon.png')} style={styles.icon}/>
                    <Text style={styles.btnTextStroke}>Continue with google  
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.navSignup} 
            onPress={() => navigation.navigate('Login')}>
            Already have an account? Login
            </Text>
        </View>
    )
}

const getStyles =(themeMode)=> StyleSheet.create({
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
        color: themeMode ? COLORS.background : COLORS.surface
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
    btn: {
        width: SIZES.width - 32,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        marginTop: 40,
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
        textAlign: 'center',
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
        marginTop: 32,
        color: themeMode ? COLORS.background : COLORS.surface
    }
})