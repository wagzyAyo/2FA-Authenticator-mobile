import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from "../components/Theme";
import { COLORS, SIZES } from "../styles";
import { TOTP } from 'totp-generator';
import * as Clipboard from 'expo-clipboard';
import { checkAccountKey } from "../utils/utils";
import Invalid from "../components/invalid";

export default function GenerateCode({ navigation, route }) {
    const { themeMode } = useContext(ThemeContext);
    const { appName, accountKey } = route.params;
    const [key, setKey] = useState(true);
    const [timer, setTimer] = useState(30);
    const [code, setCode] = useState('');

    const styles = getStyles(themeMode);

    const generateCode = () => {
        const { otp, expires } = TOTP.generate(String(accountKey));
        return { otp, expires };
    };

    const updateTimeRemaining = () => {
        const { expires, otp } = generateCode();
        setCode(otp);
        const currentTime = Date.now();
        const timeLeft = Math.floor((expires - currentTime) / 1000);
        setTimer(timeLeft > 0 ? timeLeft : 30); // Reset if time runs out
    };

    useEffect(() => {
        if (!checkAccountKey(accountKey)) {
            setKey(false);
            return;
        }

        updateTimeRemaining();
        const interval = setInterval(updateTimeRemaining, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [accountKey]);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(code);
        alert("Code copied to clipboard");
    };

    if (!key) {
        return <Invalid navigation={navigation} />;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <MaterialIcons
                name={'arrow-back'}
                size={24}
                color={themeMode ? COLORS.background : COLORS.surface}
                style={{ marginTop: 50 }}
                onPress={() => navigation.navigate('Home')}
            />
            <View style={styles.title}>
                <View style={styles.user}>
                    <Feather name="user" size={30} color={themeMode ? COLORS.surface : COLORS.background} />
                </View>
                <Text style={styles.textTitle}>{appName}</Text>
            </View>
            <View style={styles.subTitle}>
                <MaterialIcons name="lock" size={24} color={themeMode ? COLORS.background : COLORS.surface} />
                <Text style={styles.subTitleText}>Use this one-time password code generated to verify your sign-ins</Text>
            </View>
            <View style={styles.code}>
                <View style={styles.circle}>
                    <Text style={styles.timerText}>{timer}</Text>
                </View>
                <View>
                    <Text style={styles.subTitleText}>One-time password code</Text>
                    <TouchableOpacity onPress={copyToClipboard}>
                        <Text style={styles.codeText}>{code}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </View>
    );
}

const getStyles = (themeMode) => StyleSheet.create({
    container: {
        backgroundColor: themeMode ? COLORS.surface : COLORS.background,
        flex: 1,
        padding: 16,
    },
    title: {
        marginTop: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        height: 48,
        width: 48,
        borderRadius: 50,
        backgroundColor: themeMode ? COLORS.background : COLORS.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        left: SIZES.width / 4,
        color: themeMode ? COLORS.background : COLORS.surface,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        letterSpacing: 0.15,
    },
    subTitle: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
    },
    subTitleText: {
        color: themeMode ? COLORS.background : COLORS.surface,
        width: SIZES.width / 2,
        textAlign: 'left',
        fontSize: SIZES.bodyLarge,
        letterSpacing: 0.5,
    },
    code: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 23,
    },
    codeText: {
        color: COLORS.secondary,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        letterSpacing: 0.15,
        marginTop: 16,
    },
    circle: {
        position: 'relative',
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        color: themeMode ? COLORS.background : COLORS.surface,
        fontSize: SIZES.caption,
        letterSpacing: 0.4,
    },
});
