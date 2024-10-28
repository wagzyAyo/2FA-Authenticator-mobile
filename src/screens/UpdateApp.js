import {useState, useContext} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SIZES, COLORS } from "../styles";
import { ThemeContext } from '../components/Theme';
import {handleUpdate } from '../utils/utils';




export default function AddAccount({navigation, route}) {
    const {themeMode} = useContext(ThemeContext);
    const [accountKey, setAccountKey] = useState("");
    const {appName} = route.params;

    const styles = getStyles(themeMode);
    
    return (
        

        <View style={styles.container}>
            <View style={styles.title}>
            <MaterialIcons 
                name={'arrow-back'}
                size={24}
                onPress={()=>(navigation.navigate('SetUp'))}
                color={themeMode ? COLORS.background : COLORS.surface}
                />
                <Text style={styles.titleText}>Enter Account details</Text>
            </View>
            <View style={styles.input}>
            <TextInput
                placeholder='Account name'
                placeholderTextColor={themeMode ? COLORS.background : COLORS.surface}
                value={appName}
                editable={false}
                style={styles.textInput}
            />
            <TextInput
            
                placeholder='Your key'
                placeholderTextColor={themeMode ? COLORS.background : COLORS.surface}
                onChangeText={(text)=>(setAccountKey(text))}
                value={accountKey}
                style={styles.textInput}
            />
            </View>
                <TouchableOpacity style={styles.btn} onPress={()=> handleUpdate(accountKey, accountName, navigation)}>
                    <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
            
        </View>
    )
}

const getStyles = (themeMode)=> StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
    },
    title:{
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 50,
    },
    titleText: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        marginLeft: SIZES.width / 8,
        color: themeMode ? COLORS.background : COLORS.surface
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
        color: themeMode ? COLORS.background : COLORS.surface
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

