import { View, Image, StyleSheet} from "react-native";

export default function splashScreen(){
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/icon-1024-1024.png")} style={styles.img}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
})