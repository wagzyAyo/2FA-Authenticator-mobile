import { View,Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../styles";

export default function Home() {
    return (
        <View >
            <Text style={styles.text}>Home Page</Text>
            
        </View>
    )
}

styles = StyleSheet.create({
      text: {
        textAlign: "center",
        fontSize: SIZES.h2,
        marginTop: SIZES.height / 2
      }
})