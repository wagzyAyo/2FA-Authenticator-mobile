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
      showOnboarding ? (<Onboarding />)
      :
      <view>
        <Text>Home</Text>
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
    padding: 16,
  },
});
