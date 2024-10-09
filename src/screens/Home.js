import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NoCode from "./noCode";
import DrawerMenu from '../components/DrawerMenu';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Top navigation with the DrawerMenu */}
            <View style={styles.topNav}>
                <Text>
                <DrawerMenu navigation={navigation} />
                </Text>
                {/* Use the DrawerMenu component */}
                <Text style={styles.textTitle}>Alpha <Text style={styles.text2}>Authenticator</Text></Text>
            </View>

            {/* Main content */}
            <NoCode navigation={navigation} />

            {/* Floating button */}
            <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.navigate('SetUp')}>
                <MaterialIcons
                    name="add"
                    size={30}
                    color={COLORS.background}
                    style={styles.add}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topNav: {
        flexDirection: 'row',
        alignItems: 'center',
        position: "relative",
        top: 50,
    },
    textTitle: {
        left: SIZES.width / 4,
        fontSize: SIZES.h2,
        fontWeight: "bold",
        color: COLORS.secondary,
    },
    text2: {
        color: COLORS.surface,
    },
    roundBtn: {
        position: 'absolute',
        bottom: -SIZES.height * 20 / 100,
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
});
