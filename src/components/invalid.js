import { useContext } from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from "../styles";
import { ThemeContext } from "./Theme";

export default function Invalid({navigation}){
    const {themeMode} = useContext(ThemeContext)

    return(
        <View style={styles.container}>
            <MaterialIcons 
                name={'arrow-back'}
                size={24}
                onPress={()=>(navigation.navigate('Home'))}
                color={themeMode ? COLORS.background : COLORS.surface}
                style={styles.icon}
                />
                <View style={styles.center}>
                    <Image source={require('../../assets/Invalid1.png')} style={styles.img}/>
                    <Text style={styles.title}>Invalid Account key format</Text>
                    <Text style={styles.para}>Key doesn't match expected format length or alphanumeric</Text>
                </View>
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    icon:{
        marginTop: 50,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        marginTop: 40,
        width: 260,
        height: 260,
    },
    
    title: {
        marginTop: 32,
        color: COLORS.error,
        textAlign: 'center',
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        letterSpacing: 0.15,
    },
    para: {
        marginTop: 24,
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
        textAlign: 'center',
    }
})