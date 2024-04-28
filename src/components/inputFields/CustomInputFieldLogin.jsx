import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import Icon from "../Icon";
import {ICONS} from "../../constants/icons";

/**
 * ## CustomInputFieldLogin Component
 *
 * This component represents a custom input field primarily used for login screens.
 * It provides a styled TextInput for entering login credentials and integrates an optional icon for additional interactivity,
 * such as toggling password visibility. The component's style adapts to the current theme setting (dark or light).
 *
 * ### Features:
 * - **Dynamic Theme Adaptation**: Changes the background and text color of the input field based on the current theme (dark or light).
 * - **Password Visibility Toggle**: Allows users to toggle the visibility of their password, enhancing usability.
 * - **Validation Styles**: Provides visual feedback by changing the border color when an error is detected.
 * - **Icon Interactivity**: Includes an interactive icon for password fields that toggles the visibility state on press.
 *
 *
 *  @param {string} placeholder - The placeholder text displayed when the input field is empty.
 *  @param {string} keyboardType - The type of keyboard to display for the input field (e.g., "default", "numeric", "email-address").
 *  @param {number} maxTextInputLength - The maximum length of the text input allowed.
 *  @param {boolean} isPassword - Determines whether the input field should display characters as a password (default is false).
 *  @param {string | object} iconName - The name of an icon specified in constants/icons.js, rendered next to the input field.
 *  @param {function} onChangeTextHandler - Function to handle changes in text input.
 *  @param {boolean} passwordVisible - Controls whether the password is visible or obscured.
 *  @param {function} setPasswordVisible - Function to toggle the visibility of the password.
 *  @param {boolean} error - Indicates an error state in the input field that affects its styling.
 *
 * @example
 * <CustomInputFieldLogin
 *   placeholder="Password"
 *   keyboardType="default"
 *   isPassword={true}
 *   maxTextInputLength={25}
 *   iconName={ICONS.LOGIN.USER}
 *   onChangeTextHandler={(text) => setPassword(text)}
 *   passwordVisible={passwordVisible}
 *   setPasswordVisible={setPasswordVisible}
 *   error={hasError}
 * />
 */
function CustomInputFieldLogin({
              placeholder,
              keyboardType,
              maxTextInputLength,
              isPassword,
              iconName,
              onChangeTextHandler,
              passwordVisible, // Neu hinzugefügt
              setPasswordVisible, // Neu hinzugefügt
              error
}) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    // Check if the keyboardType prop has a valid value or not
    const validKeyboardTypes = [
        "default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad",
        "url",
        "visible-password",
        "ascii-capable",
        "numbers-and-punctuation",
        "name-phone-pad"
    ];
    const inputKeyboardType = validKeyboardTypes.includes(keyboardType) ? keyboardType : "default";

    const iconToShow = isPassword ? (passwordVisible ? ICONS.LOGIN.UNLOCK : ICONS.LOGIN.LOCK) : iconName;

    return (
        <View style={[isDarkMode ? styles.containerDark : styles.containerLight, styles.container, error ? styles.inputError : null]}>
            {/* Wenn isPassword true ist, rendern wir das Icon in einem TouchableOpacity für Interaktionen */}
            {isPassword ? (
                <TouchableOpacity onPressIn={() => setPasswordVisible(true)}
                                  onPressOut={() => setPasswordVisible(false)}
                                  style={styles.iconContainer}>
                    <Icon name={iconToShow} size={24} color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR} />
                </TouchableOpacity>
            ) : (
                // Wenn isPassword false ist, wird das Icon ohne TouchableOpacity gerendert
                <Icon name={iconName} size={24} color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR} />
            )}
            <TextInput
                style={[isDarkMode ? styles.inputDark : styles.inputLight, styles.input]}
                placeholder={placeholder}
                keyboardType={inputKeyboardType}
                secureTextEntry={isPassword && !passwordVisible}
                maxLength={maxTextInputLength}
                placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                onChangeText={onChangeTextHandler}
                keyboardAppearance={isDarkMode ? "dark" : "light"}
                /*
                * IOS flickering on input Issue -closed by react native as it is an IOS bug -
                * In IOS 17, setting text to secureEntry opens the password bar (enabling input of saved
                * passwords) which appearantly causes the flickering
                * was able to solve with one solution from github issues page:
                *  oneTimeCode disables the password bar
                *
                * https://github.com/facebook/react-native/issues/39411
                *
                * --> however better user experience would be an enabled password bar...
                * */
                textContentType={"oneTimeCode"}
                //autoCorrect false disables suggestions for the input
                autoCorrect={false}
            />
        </View>
    )
}

export default CustomInputFieldLogin;

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZES.BORDER_RADIUS,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        columnGap: SIZES.SPACING_HORIZONTAL_DEFAULT,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        height: 50,
    },
    containerLight: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
    },
    containerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        fontSize: SIZES.TEXTINPUT_SIZE,
        textAlign: "left",
    },
    inputLight: {
        color: LIGHTMODE.TEXTINPUT_COLOR,
    },
    inputDark: {
        color: DARKMODE.TEXTINPUT_COLOR,
    },
    iconContainer: {

    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR
    }
})