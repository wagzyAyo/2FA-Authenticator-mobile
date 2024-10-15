import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from "../styles";

export default function CodeBox({navigation, appName, accountKey}){

    const handlePress = ()=>{
        navigation.navigate('GeneratedCode', {appName, accountKey})
    }

    return(
        
        <TouchableOpacity style={styles.box} onPress={handlePress}>
            <View style={styles.user}>
                <MaterialIcons  name="person" size={30} color={COLORS.background}/>
            </View>
            <Text>{appName}</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.surface}/>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    
    box: {
        marginTop: 32,
        width: SIZES.width - (SIZES.width * 5/100),
        height: 72,
        backgroundColor: COLORS.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000000',   // Black shadow
    shadowOffset: {
      width: 0,   // X = 0
      height: 16, // Y = 16
    },
    shadowOpacity: 0.14,      // Opacity 14%
    shadowRadius: 24,         // Blur = 24

    // Android Shadow
    elevation: 10,
    },
    user: {
        height: 48,
        width: 48,
        borderRadius: 50,
        backgroundColor: COLORS.surface,
    }
})