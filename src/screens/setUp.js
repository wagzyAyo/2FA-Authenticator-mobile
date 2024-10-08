import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from "../styles";

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
            <View style={styles.choice}>
            <View style={styles.select}>
                <MaterialIcons 
                    name={'camera-alt'}
                    size={24}
                    color={COLORS.surface}
                />
                <Text style={styles.text}>Scan Qr code</Text>
            </View>
            <View style={styles.select}>
                <MaterialIcons 
                    name={'keyboard'}
                    size={24}
                    color={COLORS.surface}
                />
                <Text style={styles.text}>Enter Setup key</Text>
            </View>
            </View>
            
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
    },
    choice: {
        marginTop: 48,
    },
    select: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 24
    },
    text:{
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5
    }
})