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
                onPress={()=>(navigation.navigate('Home'))}
            />
            <View style={styles.title}>
            <View style={styles.user}>
                <MaterialIcons  name="person" size={30} color={COLORS.background}/>
            </View>
                <Text style={styles.textTitle}>{appName}</Text>
            </View>
        </View>
    )
}

const getStyles = (themeMode) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 50,
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
        backgroundColor: COLORS.surface,
    },
    textTitle: {
        color: themeMode ? COLORS.background : COLORS.surface,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
    }
})