import React, { useState, useRef, useContext } from 'react';
import { View, 
    Text,
     StyleSheet, 
     TouchableOpacity, 
     Animated, 
     Easing, 
     TouchableWithoutFeedback, 
     Image,
    Switch, 
    Alert,
    ScrollView
 } from "react-native";
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext, AppContext,BiometricContext, CameraContext  } from '../components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation }) {
    const {themeMode, toggleTheme} = useContext(ThemeContext);
    const {setShowHome} = useContext(AppContext);
    const {allowBiometric, toggleBiometric} = useContext(BiometricContext);
    const {cameraAccess, toggleCamera} = useContext(CameraContext)
    const [darkMode, setDarkMode] = useState(themeMode);
    const [biometric, setBiometric] = useState(allowBiometric);
    const [camera, setCamera] = useState(cameraAccess);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position of the drawer offscreen


    const styles = getStyles(themeMode);

    const handleNavigate = ()=>{
        navigation.navigate('AppLists');
    }

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
    };

    const handleDarkModeToggle = ()=>{
        setDarkMode(prevState => !prevState )
        toggleTheme()
    };

    const handleBiometric = ()=>{
        setBiometric(prevMode => !prevMode);
        toggleBiometric()
    };

    const handleCamera = ()=>{
        setCamera(prevMode => !prevMode);
        toggleCamera()
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
            <ScrollView>
            <View style={styles.content}>
                <Text style={styles.heading}>Settings</Text>
                <Text style={styles.paragraph}>
                    Configure your preferences for Alpha Authenticator here. 
                    You can enable features like dark mode, manage your accounts, and more.
                </Text>
                <View style={styles.manage}>
                    <TouchableOpacity style={styles.btnContainer}>
                        <Text>Dark Mode</Text><Switch value={darkMode} onValueChange={handleDarkModeToggle}></Switch>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnContainer}>
                        <Text>Biometrics login</Text><Switch value={biometric} onValueChange={handleBiometric}></Switch>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnContainer}>
                        <Text>Allow Camera access</Text><Switch value={camera} onValueChange={handleCamera}></Switch>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnContainer} onPress={handleNavigate}>
                        <View style={styles.logBtn}>
                    <MaterialIcons name='apps' size={16}/>
                        <Text>Apps</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> handleLogout()} style={styles.btnContainer}>
                        <View style={styles.logBtn}>
                        <MaterialIcons name='logout' size={16}/>
                        <Text >Logout</Text>
                        </View> 
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>

            {/* Drawer menu */}
            {drawerOpen && (
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View style={styles.drawerOverlay}>
                        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
                            <Text style={styles.drawerText} onPress={() => navigation.navigate('Home')}>View codes</Text>
                            <Text style={styles.drawerText} onPress={()=>toggleTheme()}>Dark Mode</Text>
                            <Text style={styles.drawerText} onPress={()=> setShowHome(false)}>How It Works</Text>
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
    manage: {
        marginTop: 40,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width - SIZES.width * 10/100,
        height: 44,
        backgroundColor: COLORS.background,
        marginTop: 24,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowRadius: 10,
        shadowOpacity: 0.20,
        elevation: 5,
        fontSize: SIZES.bodySmall,
        padding: 10,
    },
    logBtn: {
        flexDirection: 'row',
        alignContent: 'center',
    }
});
