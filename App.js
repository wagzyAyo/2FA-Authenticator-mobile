import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SIZES, COLORS } from './src/styles';
import { slides } from './src/slides';
import AppIntroSlider from 'react-native-app-intro-slider';
import NextBtn from './src/components/nextBtn';
import LoginScreen from './src/screens/loginScreen';

export default function App() {

  const [showhome, setShowHome] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);

  const btnLabel = (label) =>{
    return (
      <View style={styles.label}>
      <Text style={styles.labelText}>
        {label}
      </Text>
    </View>
    )
    
  }

  if(!showhome){
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) =>{
          return(
            <View style={styles.onboard}>
              <Image  
                source={item.image}
                style={{
                  width: SIZES.width - 10,
                  height: 400,
                }}
                resizeMode="contain"
              />
              <Text style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
          )
        }}
        activeDotStyle={{
          backgroundColor: COLORS.primary
        }}
        onDone={() => setShowHome(!showhome)}
        showSkipButton
        renderSkipButton={() => btnLabel("Skip")}
        renderNextButton={() => <NextBtn />}
        renderDoneButton= {() => btnLabel("Done")}
      />
    )
  }
  return (
    <View >
      {authenticated ? 
      (<LoginScreen />) 
      :

      (
        <View style={styles.container}> 
          <Text style={styles.text}>Home page</Text>
        </View>
      )
    }
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 110,

  },
  title: {
    marginTop: 64,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  description: {
    textAlign: "center",
    marginTop: 32,
    fontSize: SIZES.bodySmall,
  },
  label:{
    padding: 12,
  },
  labelText: {
    fontSize: SIZES.bodyLarge,
    color: COLORS.surface,
    letterSpacing: 0.5
  }
});
