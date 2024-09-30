import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { COLORS } from '../styles';
export default function NextBtn(){
    return (
        <View style={styles.btn}>
            <MaterialIcons 
            name='navigate-next'
            size= {40}
            color= {COLORS.primary}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        textAlign: 'center'
    }
})