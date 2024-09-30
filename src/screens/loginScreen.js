import { useState } from "react"
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native"
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function LoginScreen () {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordVisible, setPasswordVisible] = useState("false")

    
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
    }
})