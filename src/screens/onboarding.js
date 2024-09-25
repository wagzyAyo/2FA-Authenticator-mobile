import { slides } from "../components/slides";
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from "react-native-app-intro-slider";

export default function Onboarding() {
    const renderItem = ({item}) =>{
        return (
              <View style={styles.slides} >
                <Image  source={item.image}/>
                <Text>{item.title}</Text>
                <Text>{item.text}</Text>
              </View>
          )
    };

    const onDone =() =>{
        //navigate to either login or homepage depending on authentication
    };

    return (
        <AppIntroSlider 
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        activeDotStyle={styles.active}
        />
    )
  
}

const styles = StyleSheet.create({
    slides: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 428,
        height: 376,
        resizeMode: 'contain'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        marginTop: 32
    },
    text: {
        marginTop: 15,
        fontSize: 14,
        textAlign: 'center',

    },
    active: {
        backgroundColor: '#0AADAD',
    }
})

