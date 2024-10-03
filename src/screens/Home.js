import { View,Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../styles";


export default function Home() {
    return (
        <View >
            <Text style={styles.textTitle}>Alpha <Text style={styles.text2}>Authenticator</Text></Text>
            <View  style={styles.imgContainer}>
                <Image  source={require("../../assets/noCode.png")} style={styles.img} />
            </View>
            <Text style={styles.text}>No codes here yet. Add new code</Text>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Add code</Text>
            </TouchableOpacity>
            
        </View>
    )
}

styles = StyleSheet.create({
    textTitle: {
        position: "relative",
        top: 50,
        left: SIZES.width / 4,
        fontSize: SIZES.h2,
        fontWeight: "bold",
        color: COLORS.secondary     
    },
    text2: {
        color: COLORS.surface
    },
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
      },
      btn: {
        margin: SIZES.width / 24,
        width: SIZES.width - 32,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        marginTop: 40,
    },
    btnText: {
        fontSize: SIZES.button,
        letterSpacing: 1.25,
        color: COLORS.background,
        textAlign: 'center'
    },
})