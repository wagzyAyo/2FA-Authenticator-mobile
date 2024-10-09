import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DrawerMenu = ({ navigation }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current;

    const toggleDrawer = () => {
        if (drawerOpen) {
            Animated.timing(slideAnim, {
                toValue: -300,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start(() => setDrawerOpen(false));
        } else {
            setDrawerOpen(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleOutsidePress = () => {
        if (drawerOpen) {
            toggleDrawer(); // Close the drawer when clicked outside
        }
    };

    return (
        <>
            <TouchableOpacity onPress={toggleDrawer}>
                <MaterialIcons
                    name={"menu-open"}
                    size={30}
                    color={COLORS.surface}
                    style={styles.menu}
                />
            </TouchableOpacity>

            {drawerOpen && (
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View style={styles.drawerOverlay}>
                        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
                            <Text style={styles.drawerText} onPress={() => navigation.navigate('Home')}>Check codes</Text>
                            <Text style={styles.drawerText} >Dark Mode</Text>
                            <Text style={styles.drawerText} onPress={() => navigation.navigate('About')}>About</Text>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    menu: {
        paddingLeft: 16,
    },
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        height: SIZES.height,
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingLeft: 20,
        zIndex: 10,
    },
    drawerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SIZES.width,
        height: SIZES.height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9,
    },
    drawerText: {
        color: COLORS.surface,
        fontSize: 18,
        marginBottom: 20,
    },
});

export default DrawerMenu;
