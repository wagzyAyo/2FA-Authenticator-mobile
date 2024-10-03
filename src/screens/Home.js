import { View,Text, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../styles";


export default function Home() {
    return (
        <View >
            <View  style={styles.imgContainer}>
                <Image  source={require("../../assets/noCode.png")} style={styles.img} />
            </View>
            <Text style={styles.text}>No codes here yet. Add new code</Text>
            
        </View>
    )
}

styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300,
    },
    img:{
        width: 200,
        height: 200,
    },
      text: {
        textAlign: "center",
        fontSize: SIZES.bodySmall,
        marginTop: 100,
      }
})