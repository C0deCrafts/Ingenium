import {Text, View, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform} from "react-native";
import * as Linking from "expo-linking"
import CustomButton from "../../components/buttons/CustomButton";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomInputFieldLogin from "../../components/inputFields/CustomInputFieldLogin";
import {ICONS} from "../../constants/icons";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext";

/*
Die navigation-Prop ermöglicht es deinem Bildschirm, mit anderen Bildschirmen zu interagieren.
Zum Beispiel kannst du damit einen anderen Bildschirm aufrufen oder zurück zu einem vorherigen
Bildschirm navigieren. Es stellt praktisch eine Schnittstelle bereit, um zwischen den Bildschirmen
zu navigieren, ohne dass du dich um die Details der Navigation kümmern musst.
*/
function Login({navigation}){
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();

    const styles = getStyles(insets);

    const handleLogin = async () => {
        login(userName, password);
    }

    const forgotPassword = () => {
        const subject = "Passwortrücksetzung für ILIAS-Konto";
        const body = "Sehr geehrtes Support-Team,\n" +
            "\n" +
            "Ich habe mein Passwort für mein ILIAS-Konto vergessen und benötige Ihre Hilfe, um es zurückzusetzen.\n" +
            "\n" +
            "Bitte setzen Sie mein Passwort zurück und senden Sie mir die Anweisungen zur Wiederherstellung.\n" +
            "\n" +
            "Vielen Dank im Voraus.\n" +
            "\n" +
            "Mit freundlichen Grüßen,\n"
        ;
        Linking.openURL(`mailto:office@ingenium.co.at?subject=${subject}&body=${body}`);
    }

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            {/*Image and Greeting*/}
            <View style={[styles.container, styles.paddingBottom]}>
                <Image source={require("../../assets/images/Ingenium_Logo_with_box.png")} style={styles.logo}
                       resizeMode={"contain"}/>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>Willkommen!</Text>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>Nutze deine ILIAS
                    Zugangsdaten zur Anmeldung.</Text>
            </View>
            {/*Input and Login Button*/}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.inputFieldContainer}>
                    <CustomInputFieldLogin placeholder="Nutzername" keyboardType={"default"} maxTextInputLength={25}
                                           iconName={ICONS.LOGIN.USER} onChangeTextHandler={setUserName}/>
                    <CustomInputFieldLogin placeholder="Passwort" keyboardType={"default"} isPassword={true}
                                           maxTextInputLength={25} iconName={ICONS.LOGIN.LOCK} onChangeTextHandler={setPassword}/>
                    <CustomButton title={"Anmelden"} onPressFunction={() => handleLogin()}/>
                </View>
            </KeyboardAvoidingView>
            {/*Forgot Password & Create Account*/}
            <View style={[styles.container, styles.paddingTop]}>
                <TouchableOpacity onPress={() => {
                    forgotPassword()
                }}>
                    <Text style={[styles.textButton, styles.textXS]}>Password vergessen?</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS]}>Keinen
                        Account?</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("NoAccount")
                    }}>
                        <Text style={[styles.textButton, styles.textXS]}>Kontaktiere Ingenium</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login;

function getStyles(insets) {
    return StyleSheet.create({
        containerLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            paddingTop: insets.top,
            marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            justifyContent: "center"
        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            paddingTop: insets.top,
            marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            justifyContent: "center"
        },
        container: {
            justifyContent: "center",
            alignItems: "center",
        },
        logo: {
            width: '90%',
            marginBottom: SIZES.SPACING_VERTICAL_DEFAULT
        },
        paddingBottom: {
            paddingBottom: 30
        },
        paddingTop: {
            paddingTop: 30
        },
        textNormal: {
            fontSize: SIZES.TEXT_SIZE,
            lineHeight: 28
        },
        textXS: {
            fontSize: SIZES.SCREEN_TEXT_SMALL,
        },
        textLight: {
            color: LIGHTMODE.TEXT_COLOR,
            textAlign: "center"
        },
        textDark: {
            color: DARKMODE.TEXT_COLOR,
            textAlign: "center"
        },
        inputFieldContainer: {
            rowGap: SIZES.SPACING_HORIZONTAL_DEFAULT,
        },
        textButton: {
            textDecorationLine: "underline",
            marginLeft: 5,
        },
        footer: {
            paddingTop: SIZES.SPACING_HORIZONTAL_DEFAULT,
            flexDirection: "row"
        }
    })
}