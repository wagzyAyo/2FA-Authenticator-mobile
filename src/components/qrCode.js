import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-camera';

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={handleBarCodeScanned}
      style={{ flex: 1 }}
    >
      <View>
        <Text>Scan a QR code</Text>
      </View>
    </BarCodeScanner>
  );
}
