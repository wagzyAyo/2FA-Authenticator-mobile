import React, { useState, useContext } from 'react';
import { View, Text, Alert, Pressable, StyleSheet } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from "../styles";
import { ThemeContext } from '../components/Theme';

export default function QrScanner({ navigation }) {
  const {themeMode} = useContext(ThemeContext);
  const styles = getStyles(themeMode)
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View style={styles.container}>
       <MaterialIcons 
                name={'arrow-back'}
                size={24}
                onPress={()=>(navigation.navigate('Home'))}
                color={themeMode ? COLORS.background : COLORS.surface}
                style={[styles.icon, {marginTop: 50}]}
                />
      <View style={styles.req}>
      <Pressable onPress={requestPermission} style={styles.btn}>
        <Text style={styles.btnText}>Request permission</Text>
      </Pressable>

      
          <View style={styles.spacing}>
            <Link href={'/scanner'} asChild>
              <Pressable disabled={!isPermissionGranted} style={styles.btn}>
                <Text style={styles.btnText}>Scan Code</Text>
              </Pressable>
            </Link>
          </View>
        </View>
    </View>
  );
}

const getStyles = (themeMode)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeMode ? COLORS.surface : COLORS.background,
    padding: 16,
    
  },
  req: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8, // Additional vertical margin for buttons
  },
  btnText: {
    color: COLORS.surface,
    fontSize: 16,
  },
  spacing: {
    marginTop: 32, // Space between the buttons
  },
});
