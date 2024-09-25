//import { slides } from "../components/slides";
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from "react-native-app-intro-slider";
import { Sizes } from "../utils/utils";


const slides =[
    {
        id: 1,
        title: 'Stronger security',
        text: 'Enhance your 2FA app with time-based one-time passwords (TOTP) and secure QR code encryption for stronger, reliable authentication. ',
        image: require('../../assets/board1.png'),
      },
    {
        id: 2,
        title: 'Unique code to sign in',
        text: 'Sign in securely with a unique time-based one-time password (TOTP) that refreshes every 30 seconds, ensuring dynamic protection for each login attempt.',
        image: require('../../assets/board2.png'),
      },
    {
        id: 3,
        title: 'Simple setup using camera',
        text: 'Easily set up your 2FA by scanning a secure QR code with your phone’s camera, linking your account in seconds',
        image: require('../../assets/board3.png'),
      },
    
]

export default function Onboarding() {
    const renderItem = ({item}) =>{
        return (
              <View style={styles.slides} >
                <Image  source={item.image} style={styles.img}/>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
          )
    };

    const onDone =() =>{
        //navigate to either login or homepage depending on authentication
    };

    return (
        <AppIntroSlider 
        data={slides}
        renderItem={renderItem}
        onDone={onDone}
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
        width: Sizes.width - 8,
        height: 'auto',
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

