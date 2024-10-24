import React, { useState, useContext } from 'react';
import { View, Text, Alert, Pressable, StyleSheet } from 'react-native';
import { CameraView} from 'expo-camera';
import { COLORS, SIZES } from "../styles";
import { ThemeContext } from '../components/Theme';

export default function QrScanner({ navigation }) {
  const {themeMode} = useContext(ThemeContext);
  const styles = getStyles(themeMode)
  
  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        facing='back'
        onBarcodeScanned={({data})=>{
          console.log(data)
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
