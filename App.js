import './gesture-handler';
import { useState, useEffect, useContext} from 'react';
import CustomStatusBar from './src/components/customStatusBar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SIZES, COLORS } from './src/styles';
import { slides } from './src/slides';
import AppIntroSlider from 'react-native-app-intro-slider';
import NextBtn from './src/components/nextBtn';
import LoginScreen from './src/screens/loginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignUpScreen from './src/screens/signUp';
import SetUp from './src/screens/setUp';
import AddAccount from './src/screens/addAccount';
import About from './src/screens/About';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './src/screens/Settings';
import GenerateCode from './src/screens/generatedCode';
import { ThemeContext, ThemeProvider} from './src/components/Theme'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [showhome, setShowHome] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setAuthenticated(!!token);
      } catch (err) {
        console.log('Error retrieving token');
      }
    };
    checkAuthentication();
  }, []);

  
  // Wrap entire app with ThemeProvider to ensure all components can access ThemeContext
  return (
    <ThemeProvider>
      <AppContent authenticated={authenticated} showhome={showhome} setShowHome={setShowHome}/>
    </ThemeProvider>
  );
}

function AppContent({ authenticated, setShowHome, showhome }) {
  const themeMode = useContext(ThemeContext);
  const styles = getStyles(themeMode);

  const btnLabel = (label) => {
    return (
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    );
  };

  if (!showhome) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View style={styles.onboard}>
              <Image
                source={item.image}
                style={{
                  width: SIZES.width - 10,
                  height: 400,
                }}
                resizeMode="contain"
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: COLORS.primary,
        }}
        dotStyle={{backgroundColor: themeMode ? COLORS.background : COLORS.surface}}
        onDone={() => setShowHome(!showhome)}
        showSkipButton
        renderSkipButton={() => btnLabel('Skip', styles.skipAndDoneBtn) }
        renderNextButton={() => <NextBtn />}
        renderDoneButton={() => btnLabel('Done', styles.skipAndDoneBtn)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authenticated ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SetUp" component={SetUp} />
          <Stack.Screen name="AddAccount" component={AddAccount} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="GeneratedCode" component={GenerateCode} />
        </>
      </Stack.Navigator>
      <CustomStatusBar />
    </NavigationContainer>
  );
}


const getStyles = (themeMode) => StyleSheet.create({
  onboard: {
    backgroundColor: themeMode ? COLORS.surface : COLORS.background,
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 110,
  },
  title: {
    color: themeMode ? COLORS.background : COLORS.surface,
    marginTop: 64,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  description: {
    color: themeMode ? COLORS.background : COLORS.surface,
    textAlign: 'center',
    marginTop: 32,
    fontSize: SIZES.bodySmall,
  },
  label: {
    padding: 12,
  },
  labelText: {
    color: themeMode ? COLORS.background : COLORS.surface,
    fontSize: SIZES.bodyLarge,
    letterSpacing: 0.5,
  },
});
