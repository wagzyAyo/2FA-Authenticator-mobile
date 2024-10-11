import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback, Image, Switch } from "react-native";
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation }) {
    const {themeMode, toggleTheme} = useContext(ThemeContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position of the drawer offscreen


    const styles = getStyles(themeMode);

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

    const handleLogout = async ()=>{
        await AsyncStorage.removeItem('token');
        Alert.alert('Loging out.');
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            {/* Top navigation */}
            <View style={styles.topNav}>
            <TouchableOpacity onPress={toggleDrawer}>
                    {
                    themeMode ? 
                    (<Image source={require('../../assets/menuWhite.png')}
                      style={styles.menu} />) :
                      (<Image 
                      source={require('../../assets/menu.png')}
                      style={styles.menu}
                    />)
                    }
                </TouchableOpacity>

                <Text style={styles.textTitle}>Alpha <Text style={styles.text2}>Authenticator</Text></Text>
            </View>

            {/* Settings content */}
            <View style={styles.content}>
                <Text style={styles.heading}>Settings</Text>
                <Text style={styles.paragraph}>
                    Configure your preferences for Alpha Authenticator here. 
                    You can enable features like dark mode, manage your accounts, and more.
                </Text>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.text2}>Dark Mode</Text><Switch value='true'></Switch>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.text2}>Biometrics login</Text><Switch></Switch>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> handleLogout}>
                        <Text style={styles.text2}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Drawer menu */}
            {drawerOpen && (
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View style={styles.drawerOverlay}>
                        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
                            <Text style={styles.drawerText} onPress={() => navigation.navigate('Home')}>View codes</Text>
                            <Text style={styles.drawerText} onPress={()=>toggleTheme()}>Dark Mode</Text>
                            <Text style={styles.drawerText}>How It Works</Text>
                            <Text style={styles.drawerText} onPress={() => navigation.navigate('About')}>About</Text>
                            <Text style={styles.drawerText} onPress={() => navigation.navigate('Settings')}>Settings</Text>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
}

const getStyles = (themeMode) =>StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
    },
    topNav: {
        flexDirection: 'row',
        alignItems: 'center',
        position: "relative",
        top: 50,
        paddingLeft: 16,
    },
    menu: {
        width: 30,
        height: 17,
    },
    textTitle: {
        left: SIZES.width / 4,
        fontSize: SIZES.h2,
        fontWeight: "bold",
        color: COLORS.secondary,
    },
    text2: {
        color: themeMode ? COLORS.background : COLORS.surface,
    },
    content: {
        marginTop: 100,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 20,
    },
    paragraph: {
        fontSize: SIZES.body2,
        color: themeMode ? COLORS.background : COLORS.surface,
    },
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        height: SIZES.height,
        backgroundColor: themeMode ? COLORS.background : COLORS.surface,
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
        color: themeMode ? COLORS.surface : COLORS.background,
        fontSize: 18,
        marginBottom: 20,
    },
});