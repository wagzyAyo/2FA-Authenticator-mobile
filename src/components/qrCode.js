import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QrScanner({navigation}) {
  

  return (
    <BarCodeScanner
      
      style={{ flex: 1 }}
    >
      <View>
        <Text>Scan a QR code</Text>
      </View>
    </BarCodeScanner>
  );
}
