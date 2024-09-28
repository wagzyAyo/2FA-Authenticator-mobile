import { slides } from "../components/slides";
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from "react-native-app-intro-slider";
import { Sizes } from "../utils/utils";



export default function Onboarding() {

    return (
        <AppIntroSlider 
        data={slides}
        renderItem={
            ({item})=>{
                return(
                    <View >
                        <Image  source={item.image} style={styles.img}/>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
                )
            }
        }
        activeDotStyle={styles.active}
        />
    )
  
}

const styles = StyleSheet.create({
    slides: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    img: {
        width: Sizes.width - 80,
        height: 'auto',
        resizeMode: 'contain'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        marginTop: 32,
        color: 'black'
    },
    text: {
        marginTop: 15,
        fontSize: 14,
        textAlign: 'center',
        color: 'black',

    },
    active: {
        backgroundColor: '#0AADAD',
    }
})

