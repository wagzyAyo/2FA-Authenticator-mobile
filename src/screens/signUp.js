import { useState } from "react"
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from "react-native"
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function SignUpScreen ({navigation}) {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordVisible, setPasswordVisible] = useState("false")
const [passwordVisible2, setPasswordVisible2] = useState("false")


const handleSignup = async ()=>{
    if (email && password && confirmPassword){
        try {
            if (password == confirmPassword){
                const response = await fetch('http://192.168.90.218:5000/api/auth/signup', {
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
                    Alert.alert('success', data.message)
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

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputPassword} 
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
                        color={COLORS.surface}
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
                    <Text style={styles.btnTextStroke}>Continue with google
                        <Image source={require('../../assets/googleIcon.png')} style={styles.icon}/>
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
        marginTop: 24,
        textAlign: 'center'
    },
    btnStroke: {
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