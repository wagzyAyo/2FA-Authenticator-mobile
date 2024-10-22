import { useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { COLORS } from '../styles';
import { ThemeContext} from './Theme'; 


export default function NextBtn(){
    const {themeMode} = useContext(ThemeContext);

    const styles = getStyles(themeMode)

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

const getStyles = (themeMode)=> StyleSheet.create({
    btn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: themeMode ? COLORS.background : COLORS.surface,
        textAlign: 'center'
    }
})