import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from "react-native";
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
function Login(){
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const [userName, setUserName] = useState("becker.emma");
    const [password, setPassword] = useState("becker2");
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();

    const styles = getStyles(insets);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(userName, password);
        } catch (err) {
            console.error("Login Fehler, ", err)
        } finally {
            setLoading(false);
        }

    }

    /**
     * Opens the Ingenium Websites contact section, if the URL is valid.
     * If it is not supported an error message is printed to the console.
     */
    const handleOpenIngeniumWebsite = async () => {
        //canOpenURL checks if the given URL can be opened, the Promise resolves either to true or false
        const supportedURL = await Linking.canOpenURL("https://www.ingenium.co.at/ueber-uns/kontakt");
        //if it resolves to true, the website is opened, else an error is printed
        if(supportedURL) {
            await Linking.openURL("https://www.ingenium.co.at/ueber-uns/kontakt");
        } else  {
            console.error("The contact link on login Screen is not supported");
        }
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

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
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
            {/*Input and Login Button
            wrapped in Keyboardavoiding view, to make sure the login input fields are accessible when the keyboard is open
            */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputFieldContainer}
            >
                <CustomInputFieldLogin placeholder="Nutzername" keyboardType={"default"} maxTextInputLength={25}
                                       iconName={ICONS.LOGIN.USER} onChangeTextHandler={setUserName}/>
                <CustomInputFieldLogin placeholder="Passwort" keyboardType={"default"} isPassword={true}
                                       maxTextInputLength={25} iconName={ICONS.LOGIN.LOCK} onChangeTextHandler={setPassword}/>
                <CustomButton title={"Anmelden"} onPressFunction={() => handleLogin()}/>
            </KeyboardAvoidingView>
            {/*Forgot Password & Create Account*/}
            <View style={[styles.container, styles.paddingTop]}>
                <TouchableOpacity onPress={() => {
                    forgotPassword()
                }}>
                    <Text style={[isDarkMode? styles.textDark : styles.textLight, styles.textButton, styles.textXS]}>Password vergessen?</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS]}>Keinen Account?</Text>
                    <TouchableOpacity onPress={() => handleOpenIngeniumWebsite()}>
                        <Text style={[isDarkMode? styles.textDark : styles.textLight ,styles.textButton, styles.textXS]}>Kontaktiere Ingenium</Text>
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
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            justifyContent: "center"
        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            paddingTop: insets.top,
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
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