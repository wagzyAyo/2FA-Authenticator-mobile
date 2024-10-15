import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../components/Theme";
import { COLORS, SIZES } from "../styles";


export default function GenerateCode({navigation, route}){
    const {themeMode} = useContext(ThemeContext);
    const {appName, accountKey} = route.params

    const styles = getStyles(themeMode)


    return (
        <View style={styles.container}>
            <MaterialIcons 
                name={'arrow-back'}
                size={24}
                color={themeMode ? COLORS.background : COLORS.surface}
                style={{marginTop: 50}}
                onPress={()=>(navigation.navigate('Home'))}
            />
            <View style={styles.title}>
            <View style={styles.user}>
                <MaterialIcons  name="person" size={30} 
                color={themeMode ? COLORS.surface : COLORS.background}/>
            </View>
                <Text style={styles.textTitle}>{appName}</Text>
            </View>
            <View style={styles.subTitle}>
                <MaterialIcons name="lock" size={24} color={themeMode ? COLORS.background : COLORS.surface}/>
                <Text style={styles.subTitleText}>Use this one-time password code
                generated to verify your sign-ins</Text>
            </View>

            <View>
                <View>
                    {/* Timer here */}
                </View>
                <View>
                    <Text>One-time password code</Text>
                    <Text>{/* Code here */}</Text>
                </View>
            </View>
        </View>
    )
}

const getStyles = (themeMode) => StyleSheet.create({
    container: {
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
        flex: 1,
        padding: 16,
    },
    title: {
        marginTop: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        height: 48,
        width: 48,
        borderRadius: 50,
        backgroundColor: themeMode ? COLORS.background : COLORS.surface,
    },
    textTitle: {
        left: SIZES.width /4,
        color: themeMode ? COLORS.background : COLORS.surface,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
    },
    subTitle: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
    },
    subTitleText: {
        color: themeMode ? COLORS.background : COLORS.surface,
        width: SIZES.width / 2,
        textAlign:'left',
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
    }

})