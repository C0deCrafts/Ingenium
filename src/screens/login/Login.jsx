import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert
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
import LoadingComponent from "../../components/LoadingComponent";

/**
 * ### Login Component
 *
 * This component manages the user login process within the application. It supports both dark and light themes,
 * allowing users to enter their username and password. It also handles interactions like logging in, toggling
 * the visibility of passwords, and provides links for password recovery and contacting support.
 *
 * #### Functionality:
 * - **Theme Adjustment**: Uses the `useTheme` hook to check whether the theme is dark or light, and changes the
 *   interface to match.
 * - **State Management**: Keeps track of user inputs such as username and password, loading status, visibility of the password,
 *   and whether a login attempt has failed.
 * - **Validation Checks**: Ensures that neither the username nor password fields are empty before allowing submission.
 * - **Password Visibility Toggling**: Allows users to toggle the visibility of their password using an icon.
 * - **External Links**: Provides links for users to reset their password or contact support.
 *
 * #### Structure:
 * 1. **Main View Container**: Adapts its style based on the theme, ensuring compatibility with all devices.
 * 2. **Image and Greeting Section**: Displays the company logo and welcome messages.
 * 3. **Input Fields and Login Button**:
 *    - **KeyboardAvoidingView**: Ensures that text inputs remain visible when the keyboard is active, especially on iOS.
 *    - **Custom Input Fields**: Fields for entering the username and password, which include icons to indicate the required data type and
 *      toggle visibility of the password.
 * 4. **Action Links**:
 *    - **Forgot Password**: Allows users to email request help with resetting their password.
 *    - **Contact Support**: Provides a link to the company’s contact page for users who need additional assistance or want to create an account.
 *
 * #### Elements:
 * - **Image**: Displays the company logo.
 * - **Text**: Provides greeting and instructions for users.
 * - **CustomInputFieldLogin**: Custom components for user input fields, with properties to manage text input, password visibility, and validation errors.
 * - **CustomButton**: Triggers the login process when clicked.
 * - **TouchableOpacity**: Used for interactive texts that help users reset their password or contact support.
 *
 * Each component part is designed to enhance user experience by making the interaction smooth, straightforward, secure, and user-friendly.
 */
function Login(){
    const insets = useSafeAreaInsets();
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loginFailed, setLoginFailed] = useState(false);

    const {login, loginError} = useAuth();

    const styles = getStyles(insets);

    /**
     * Handles the user login operation. It performs basic validation checks
     * and uses the `login` function from the `useAuth` context to authenticate the user.
     * Sets various states based on the outcome of the authentication attempt.
     */
    const handleLogin = async () => {
        setLoginFailed(false);

        if (userName.trim() === "" || password.trim() === "") {
            Alert.alert(
                "Eingabefehler",
                "Benutzername oder Passwortfeld darf nicht leer sein.",
                [{text: "OK"}]
            );
            return; // Beenden der Funktion, um keine API-Anfrage zu senden
        }
        setLoading(true);
        try {
            await login(userName, password);
        } catch (err) {
            setLoginFailed(true);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Opens the external contact URL in a browser if it's supported.
     * If the URL is not supported, logs an error message.
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

    /**
     * Sends an email to reset the password for the account using the default email app.
     * The email includes a preset subject and body text asking for password reset help.
     */
    const forgotPassword = async () => {
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
        await Linking.openURL(`mailto:office@ingenium.co.at?subject=${subject}&body=${body}`);
    }

    if (loading) {
        return (
            <LoadingComponent message={"Du wirst gerade eingeloggt..."}/>
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
            {/*Input and Login Button wrapped in Keyboard avoiding view, to make sure the login input fields are accessible when the keyboard is open*/}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputFieldContainer}
                keyboardVerticalOffset={25}
            >
                <CustomInputFieldLogin
                    placeholder="Nutzername"
                    keyboardType="default"
                    maxTextInputLength={40}
                    iconName={ICONS.LOGIN.USER}
                    onChangeTextHandler={setUserName}
                    error={loginFailed}
                />
                <CustomInputFieldLogin
                    placeholder="Passwort"
                    keyboardType="default"
                    maxTextInputLength={40}
                    iconName={passwordVisible ? ICONS.LOGIN.UNLOCK : ICONS.LOGIN.LOCK}
                    isPassword={true}
                    passwordVisible={passwordVisible}
                    setPasswordVisible={setPasswordVisible}
                    onChangeTextHandler={setPassword}
                    error={loginFailed}
                />
                    <CustomButton title={"Anmelden"} onPressFunction={handleLogin}/>
                {/* Display the error message if loginError has a value */}
                {loginError && <Text style={{ color: 'red', textAlign: "center" }}>{loginError}</Text>}
            </KeyboardAvoidingView>
            {/*Forgot Password & Create Account*/}
            <View style={[styles.container, styles.paddingTop]}>
                <TouchableOpacity onPress={forgotPassword}>
                    <Text style={[isDarkMode? styles.textDark : styles.textLight, styles.textButton, styles.textXS]}>Password vergessen?</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS]}>Keinen Account?</Text>
                    <TouchableOpacity onPress={handleOpenIngeniumWebsite}>
                        <Text style={[isDarkMode? styles.textDark : styles.textLight ,styles.textButton, styles.textXS]}>Kontaktiere Ingenium</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login;

/**
 * Defines the styles used in the Login component.
 * It handles different styles for light and dark mode based on the theme.
 *
 * @param insets - Safe area insets used for dynamic spacing.
 */
function getStyles(insets) {
    return StyleSheet.create({
        containerLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            //paddingTop: insets.top,
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            justifyContent: "center"
        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            //paddingTop: insets.top,
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