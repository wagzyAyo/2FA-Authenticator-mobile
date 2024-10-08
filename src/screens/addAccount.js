import {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SIZES, COLORS } from "../styles";



export default function AddAccount({navigation}) {
    const [accountName, setAccountName] = useState("");
    const [accountKey, setAccountKey] = useState("")


    return (
        

        <View style={styles.container}>
            <View style={styles.title}>
            <MaterialIcons 
                name={'arrow-back'}
                size={24}
                onPress={()=>(navigation.navigate('SetUp'))}
                />
                <Text style={styles.titleText}>Enter Account details</Text>
            </View>
            <View style={styles.input}>
            <TextInput
                placeholder='Account name'
                onChange={(text)=>(setAccountName(text))}
                value={accountName}
                style={styles.textInput}
            />
            <TextInput
                placeholder='Your key'
                onChange={(text)=>(setAccountKey(text))}
                value={accountKey}
                style={styles.textInput}
            />
            </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 50,
    },
    title:{
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center'
    },
    titleText: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        marginLeft: SIZES.width / 8
    },
    input: {
        marginTop: 24,
    },
    textInput: {
        marginTop: 24,
        borderWidth: 1,
        width: SIZES.width - 32,
        borderColor: COLORS.primary,
        borderRadius: 10,
        padding: 16,
    },
    btn: {
        width: SIZES.width - 32,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        marginTop: 48,
    },
    btnText: {
        fontSize: SIZES.button,
        letterSpacing: 1.25,
        color: COLORS.background,
        textAlign: 'center'
    },
})

