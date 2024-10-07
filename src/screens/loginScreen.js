import { useState } from "react"
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from "react-native"
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function LoginScreen ({navigation}) {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordVisible, setPasswordVisible] = useState("false");


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
}

    
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image source={require('../../assets/alpha.png')} style={styles.logoImg}/>
            </View>
           
            <Text style={styles.title}>Login into your account</Text>
            <TextInput style={styles.input} 
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputPassword} 
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
                        name={passwordVisible ? "visibility-off" : "visibility"}
                        size={24}
                        color={COLORS.surface}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.fingerPrint}>
                <MaterialIcons  name="fingerprint" size={26} color={SIZES.surface}/>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 120,
    },
    logoContainer: {
        flex: 1,
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
        letterSpacing: 0.15
    },
    input: {
        marginTop: 24,
        borderWidth: 1,
        width: SIZES.width - 32,
        borderColor: COLORS.primary,
        borderRadius: 10,
        padding: 16,
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
    },

    eyeIcon: {
        position: "absolute",
        right: 10,
        top: 20,
    },
    fingerPrint: {
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
        color: COLORS.surface,
        display: 'flex',
        textAlign: 'center',
    },

    navSignup: {
        textAlign: 'center',
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
        marginTop: 32,
    }
})