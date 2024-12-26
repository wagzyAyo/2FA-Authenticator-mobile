import { useContext } from "react";
import { View, Image, StyleSheet} from "react-native";
import { ThemeContext } from "../components/Theme";
import { COLORS } from "../styles";

export default function splashScreen(){
    const {themeMode} = useContext(ThemeContext);
    const styles = getStyles(themeMode)
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/icon-1024-1024.png")} style={styles.img}/>
        </View>
    )
}

const getStyles = (themeMode)=> StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themeMode ? COLORS.surface : COLORS.background
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
})