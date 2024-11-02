import { useContext, useState, useRef, useEffect } from "react";
import { View, 
    Text, 
    StyleSheet , 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    Animated, 
    Easing, 
    Image, 
    Alert, 
    ScrollView } from "react-native";
import { ThemeContext, AppContext } from "../components/Theme";
import { COLORS,SIZES } from "../styles";

export default function AppLists({navigation}){
    const {themeMode, toggleTheme} = useContext(ThemeContext);

    const {setShowHome} = useContext(AppContext)
    const [data, setData] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position of the drawer offscreen

    const styles = getStyles(themeMode);

    const getAppLists = async ()=>{
        try {
            const response = await fetch('https://twofa-authenticator.onrender.com/api/getapps', 
                {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }
            );
            
            const responseData = await response.json();
            //console.log({'fetchedData': responseData})
            if(response.status === 200){
                setData(responseData);
            }else{
                setData([])
            }
        } catch (err) {
            console.log(err)
            Alert.alert('Error fetching data from database')
        }
       
    };

    useEffect(()=>{
        getAppLists();
        console.log(data)
    }, [])

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

    const handleAccountPress = (app)=>{
        const appName = app?.name;
        if(appName){
            navigation.navigate('UpdateApp', {appName});
        }else{
            console.log(app)
        }
        
    }

return(
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
            <ScrollView>
            <Text style={styles.topText}>
                If you’re a returning user or need to update an app’s key, click on the app name to update it.
            </Text>
            {data.length > 0 ? 
            (data.map((app, index)=>

                <TouchableOpacity style={styles.box} key={index} onPress={()=>handleAccountPress(app)}>
                      <Text style={styles.boxText}>{app.name}</Text>
                </TouchableOpacity>
                
            )) :
            (<Text style={styles.text2}>No app to show</Text>)
            
        }
        <View style={styles.bottom}></View>
        </ScrollView>


            {/* Drawer menu - overlay */}
            {drawerOpen && (
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View style={styles.drawerOverlay}>
                        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
                            <Text style={styles.drawerText} onPress={()=> navigation.navigate('Home')}>View codes</Text>
                            <Text style={styles.drawerText} onPress={()=> toggleTheme()}>Dark mode</Text>
                            <Text style={styles.drawerText} onPress={()=> setShowHome(false)}>How it works</Text>
                            <Text style={styles.drawerText} onPress={()=> navigation.navigate('About')}>About</Text>
                            <Text style={styles.drawerText} onPress={()=> navigation.navigate('Settings')}>Settings</Text>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
    </View>
    
)
}

const getStyles = (themeMode)=>StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
    },
    topNav: {
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
        width: SIZES.width,
        height: 80,
        zIndex: 1,
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
        marginTop: SIZES.height /2,
        fontSize: SIZES.h2,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background for effect
        zIndex: 9, // Layer between drawer and content
    },
    drawerText: {
        color: themeMode ? COLORS.surface : COLORS.background,
        fontSize: 18,
        marginBottom: 20,
    },
    box: {
        padding: 8,
        marginTop: 40,
        zIndex: -1,
        width: SIZES.width - (SIZES.width * 7/100),
        height: 72,
        backgroundColor: COLORS.background,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000000',   // Black shadow
    shadowOffset: {
      width: 0,   // X = 0
      height: 16, // Y = 16
    },
    shadowOpacity: 0.14,      // Opacity 14%
    shadowRadius: 24,         // Blur = 24

    // Android Shadow
    elevation: 10,
    },
    topText: {
        zIndex: -1,
        marginTop: 50 + 32,
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
    },
    boxText: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        letterSpacing: 0.15,
    },
    bottom: {
        marginTop: 32
    }
})