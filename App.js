import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { typo, COLORS } from './src/styles';

export default function App() {
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
  text: {
    fontSize: typo.h2
  }
});
