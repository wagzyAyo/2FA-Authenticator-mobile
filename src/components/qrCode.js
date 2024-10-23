import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';

export default function QrScanner({navigation}) {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View>
      <Pressable onPress={requestPermission}>
        <Text>Request permission</Text>
      </Pressable>
      <Link href={'/scanner'} asChild>
          <Pressable disabled={!isPermissionGranted}>
             <Text>
                Scan Code
             </Text>
          </Pressable>
      </Link>
    </View>
  );
}
