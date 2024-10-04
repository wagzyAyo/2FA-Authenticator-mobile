import { useState } from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NoCode from "./noCode";


export default function Home() {
    const [codes, setCodes] = useState(false)
    return (
        <View >
            <Text style={styles.textTitle}>Alpha <Text style={styles.text2}>Authenticator</Text></Text>
            {!codes ? 
            (<NoCode />) :
            (<Text>Codes</Text>)
        }
            <TouchableOpacity style={styles.roundBtn}>
                <MaterialIcons
                    name="add"
                    size={35}
                    color={COLORS.background}
                    style={styles.add}
                />
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
    roundBtn: {
        position: 'fixed',
        top: 70,
        left: SIZES.width - 72,
        width: 58,
        height: 58,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowRadius: 10,
        shadowOpacity: 0.20,
        elevation: 5,
    },
})