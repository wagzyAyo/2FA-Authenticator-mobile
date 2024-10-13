import { useContext} from 'react'
import { View, Text, StyleSheet} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from "../styles";
import { ThemeContext } from '../components/Theme';

export default function SetUp({navigation}){
    const {themeMode} = useContext(ThemeContext);
    const styles = getStyles(themeMode)
    return(
        <View style={styles.container}>
            <View >
                <MaterialIcons 
                name={'arrow-back'}
                size={24}
                onPress={()=>(navigation.navigate('Home'))}
                color={themeMode ? COLORS.background : COLORS.surface}
                style={styles.icon}
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
                    color={themeMode ? COLORS.background : COLORS.surface}
                />
                <Text style={styles.text}>Scan Qr code</Text>
            </View>
            <View style={styles.select} >
                <MaterialIcons 
                    name={'keyboard'}
                    size={24}
                    color={themeMode ? COLORS.background : COLORS.surface}
                />
                <Text style={styles.text} onPress={()=>(navigation.navigate('AddAccount'))}>Enter Setup key</Text>
            </View>
            </View>
            
        </View>
    )
}

const getStyles = (themeMode) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
    },
    icon: {
        marginTop: 50,
    },
    title: {
        marginTop: SIZES.width / 4,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        textAlign: 'center',
        color: themeMode ? COLORS.background : COLORS.surface
    },
    subTitle: {
        marginTop: 40,
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
        textAlign: "center",
        color: themeMode ? COLORS.background : COLORS.surface
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
        letterSpacing: 0.5,
        color: themeMode ? COLORS.background : COLORS.surface
    }
})