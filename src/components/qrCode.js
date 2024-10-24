import React, { useState, useContext } from 'react';
import { View, Text, Alert, Pressable, StyleSheet } from 'react-native';
import { CameraView} from 'expo-camera';
import { COLORS, SIZES } from "../styles";
import { ThemeContext } from '../components/Theme';
import { handleSubmit } from '../utils/utils';

export default function QrScanner({ navigation }) {
  const {themeMode} = useContext(ThemeContext);
  const styles = getStyles(themeMode);

  const handleBarCodeScanned = async({data})=>{
    const regex = /otpauth:\/\/totp\/([^:]*):([^?]*)\?secret=([^&]*)/;
    const match = data.match(regex);
    if(match){
      const appName = match[1];
      const key = match[2];
      handleSubmit(appName, key, navigation)
    } else {
      Alert.alert('Invalid QR Code', 'The scanned QR code is not valid.');
    }
  }
  
  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        facing='back'
        onBarcodeScanned={({data})=>{
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
