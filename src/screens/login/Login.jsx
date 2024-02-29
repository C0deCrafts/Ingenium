import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import * as Linking from "expo-linking"
import CustomButton from "../../components/buttons/CustomButton";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomInputFieldLogin from "../../components/inputFields/CustomInputFieldLogin";

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

    const styles = getStyles(insets);

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
            <View style={styles.container}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Willkommen an Board</Text>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Nutze deine Ilias Zugangsdaten für den Login</Text>
            </View>
            <View>
                <CustomInputFieldLogin placeholder="Benutzername" keyboardType={"default"} maxTextInputLength={25}/>
                <CustomInputFieldLogin placeholder="Password" keyboardType={"default"} isPassword={true} maxTextInputLength={25}/>
            </View>

            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{forgotPassword()}}>
                    <Text style={styles.textButton}>Password vergessen?</Text>
                </TouchableOpacity>
            </View>

            <CustomButton title={"Login"} onPressFunction={()=> console.log("Pressed")}/>

            <View style={[styles.container, styles.footer]}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Keinen Account?</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("NoAccount")}}>
                    <Text style={styles.textButton}>Kontaktiere Ingenium</Text>
                </TouchableOpacity>
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
        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            paddingTop: insets.top,
            marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        },
        container: {
            justifyContent: "center",
            alignItems: "center"
        },
        textLight: {
            color: LIGHTMODE.TEXT_COLOR,
        },
        textDark: {
            color: DARKMODE.TEXT_COLOR,
        },
        textButton: {
            fontWeight: SIZES.BUTTON_LABEL_WEIGHT,
            color: COLOR.BUTTONCOLOR,
            marginLeft: 5,
        },
        footer: {
            flexDirection: "row"
        }
    })
}