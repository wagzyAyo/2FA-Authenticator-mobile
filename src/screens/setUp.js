import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SIZES } from "../styles";

export default function SetUp({navigation}){
    return(
        <View style={styles.container}>
            <View >
                <MaterialIcons 
                name={'arrow-back'}
                size={24}
                onPress={()=>(navigation.navigate('Home'))}
                />
            </View>
            <Text style={styles.title}>
                Set up 2FA for your account
            </Text>

            <Text style ={styles.subTitle}>
                Use the Qr code or setup key in your 2FA settings.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 16,
    },
    title: {
        marginTop: SIZES.width / 4,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: {
        marginTop: 40,
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
        textAlign: "center"
    }
})