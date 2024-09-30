import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SIZES, COLORS } from './src/styles';
import { slides } from './src/slides';
import AppIntroSlider from 'react-native-app-intro-slider';
import NextBtn from './src/components/nextBtn';

export default function App() {

  const [showhome, setShowHome] = useState(false)

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
        onDone={() => setShowHome = true}
        renderNextButton={() => <NextBtn />}
      />
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
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

  }
});
