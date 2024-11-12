import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, Pressable, StyleSheet } from 'react-native';
import { CameraView} from 'expo-camera';
import { COLORS, SIZES } from "../styles";
import { ThemeContext, CameraContext } from '../components/Theme';
import { handleSubmit } from '../utils/utils';

export default function QrScanner({ navigation }) {
  const {themeMode} = useContext(ThemeContext);
  const {cameraAccess} = useContext(CameraContext);
  const [hasScanned, setHasScanned] = useState(false)
  const styles = getStyles(themeMode);

  useEffect(()=>{
    console.log(cameraAccess)
  }, [])

  const handleBarCodeScanned = async({data})=>{
    if(hasScanned){
      return;
    }
    setHasScanned(true);
    console.log(data)
    const regex = /otpauth:\/\/totp\/([^:]*):([^?]*)\?secret=([^&]*)/;
    const match = data.match(regex);
    if(match){
      const appName = match[1];
      const key = match[3];

      console.log(appName);
      console.log(key)
    try {
      handleSubmit(key, appName, navigation)
    } catch (err) {
      Alert.alert("Error adding account", err)
    }
      
    } else {
      Alert.alert('Invalid QR Code', 'The scanned QR code is not valid.');
    }
  }
  
  if(!cameraAccess){
    Alert.alert(`Camera access not given to the app:
      Give camera access in settings`)
    return(
      <View>
         {navigation.navigate('SetUp')}
        {Alert.alert(`Camera access not given to the app:
          Allow camera access in settings`)}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        facing='back'
        onBarcodeScanned={(data)=>{
          handleBarCodeScanned(data)
        }}
      />
    </View>
  );
}

const getStyles = (themeMode)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeMode ? COLORS.surface : COLORS.background,
    padding: 16,
    
  },
});
