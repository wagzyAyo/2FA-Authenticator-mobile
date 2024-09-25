import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './src/screens/onboarding';


export default function App() {
const [showOnboarding, setShowOnboarding] = useState(true)

const handleDone = () =>{
  setShowOnboarding(false)
}

  return (
    
    <View style={styles.container}>
      {
      showOnboarding ? (<Onboarding onDone={handleDone}/>)
      :
      <view>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </view>
    }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
