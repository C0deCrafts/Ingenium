import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Linking} from "react-native";
import CustomButton from "../../components/CustomButton";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomInputField from "../../components/CustumInputField";
import {useTheme} from "../../constants/context/ThemeContext";

/*
Die navigation-Prop ermöglicht es deinem Bildschirm, mit anderen Bildschirmen zu interagieren.
Zum Beispiel kannst du damit einen anderen Bildschirm aufrufen oder zurück zu einem vorherigen
Bildschirm navigieren. Es stellt praktisch eine Schnittstelle bereit, um zwischen den Bildschirmen
zu navigieren, ohne dass du dich um die Details der Navigation kümmern musst.
*/
function Login({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

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
        <SafeAreaView style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <View style={styles.container}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Willkommen an Board</Text>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Nutze deine Ilias Zugangsdaten für den Login</Text>
            </View>
            <View>
                <CustomInputField placeholder="Benutzername" keyboardType={"default"} maxTextInputLength={25}/>
                <CustomInputField placeholder="Password" keyboardType={"default"} isPassword={true} maxTextInputLength={25}/>
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
        </SafeAreaView>

    )
}

export default Login;

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR
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