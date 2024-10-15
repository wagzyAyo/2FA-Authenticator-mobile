import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback, Image } from "react-native";
import { COLORS, SIZES } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NoCode from "./noCode";
import CodeBox from '../components/codeBox';
import { ThemeContext } from '../components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const {themeMode, toggleTheme} = useContext(ThemeContext);
    const [data, setData] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position of the drawer offscreen

    const styles = getStyles(themeMode)
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

    useEffect(()=>{
        const getAppsData= async ()=>{
            try {
                const appsData = await AsyncStorage.getItem('accounts');
            if(appsData){
                setData(JSON.parse(appsData));
            }
            } catch (err) {
                console.log(err)
            }
        }
        getAppsData();
    }, [])

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
            <View style={styles.main}>
                {/* Main content */}
                { data.length > 0 ? 
                    ( data.map((appData, index) => 
                    <CodeBox 
                    key={index} navigation={navigation} 
                    appName={appData.appName} accountKey={appData.accountKey}/>)
                    )
                    :
                    (<NoCode navigation={navigation} />)
                }
            </View>
            

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
                            <Text style={styles.drawerText} onPress={()=> navigation.navigate('Home')}>View codes</Text>
                            <Text style={styles.drawerText} onPress={()=> toggleTheme()}>Dark mode</Text>
                            <Text style={styles.drawerText}>How it works</Text>
                            <Text style={styles.drawerText} onPress={()=> navigation.navigate('About')}>About</Text>
                            <Text style={styles.drawerText} onPress={()=> navigation.navigate('Settings')}>Settings</Text>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
}

const getStyles = (themeMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
    },
    topNav: {
        flexDirection: 'row',
        alignItems: 'center',
        position: "relative",
        top: 50,
        paddingLeft: 16
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
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        height: SIZES.height,
        backgroundColor: themeMode ? COLORS.background : COLORS.surface,
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
        color: themeMode ? COLORS.surface : COLORS.background,
        fontSize: 18,
        marginBottom: 20,
    },
    roundBtn: {
        position: 'absolute',
        bottom: 150,
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
    main: {
        marginTop: 50,
    }
});
