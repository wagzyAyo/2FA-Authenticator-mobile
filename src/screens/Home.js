import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NoCode from "./noCode";

export default function Home({ navigation }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position of the drawer offscreen

    const toggleDrawer = () => {
        if (drawerOpen) {
            Animated.timing(slideAnim, {
                toValue: -300, // Slide back offscreen
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start(() => setDrawerOpen(false));
        } else {
            setDrawerOpen(true);
            Animated.timing(slideAnim, {
                toValue: 0, // Slide onscreen
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleOutsidePress = () => {
        if (drawerOpen) {
            toggleDrawer(); // Close the drawer if it's open and clicked outside
        }
    };

    return (
        <View style={styles.container}>
            {/* Top navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={toggleDrawer}>
                    <MaterialIcons
                        name={"menu-open"}
                        size={30}
                        color={COLORS.surface}
                        style={styles.menu}
                    />
                </TouchableOpacity>

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

            {/* Drawer menu - overlay */}
            {drawerOpen && (
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View style={styles.drawerOverlay}>
                        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
                            <Text style={styles.drawerText} onPress={()=> navigation.navigate('Home')}>Check codes</Text>
                            <Text style={styles.drawerText}>Dark mode</Text>
                            <Text style={styles.drawerText} onPress={()=> navigation.navigate('About')}>About</Text>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
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
    menu: {
        paddingLeft: 16,
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
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        height: SIZES.height,
        backgroundColor: COLORS.surface,
        paddingTop: 50,
        paddingLeft: 20,
        zIndex: 10, // Make sure it overlaps the content
    },
    drawerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SIZES.width,
        height: SIZES.height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background for effect
        zIndex: 9, // Layer between drawer and content
    },
    drawerText: {
        color: COLORS.background,
        fontSize: 18,
        marginBottom: 20,
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
