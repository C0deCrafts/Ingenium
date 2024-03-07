import {StyleSheet, TextInput, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

/**
 * ## CustomInputFieldLogin Component
 *
 * This component represents a custom input field for login screens.
 * It provides a styled text input field for entering login credentials.
 * The appearance of the input field is determined by the current theme (dark/light).
 *
 * @param {string} placeholder - The placeholder text displayed when the input field is empty.
 * @param {string} keyboardType - The type of keyboard to display for the input field (e.g., "default", "numeric", "email-address").
 * @param {number} maxTextInputLength - The maximum length of the text input allowed.
 * @param {boolean} isPassword - Determines whether the input field should display characters as a password (default is false).
 *
 * @example
 * <CustomInputFieldLogin
 *   placeholder="Password"
 *   keyboardType={"default"}
 *   isPassword={true}
 *   maxTextInputLength={25}/>
 */
function CustomInputFieldLogin({placeholder, keyboardType, maxTextInputLength, isPassword}) {
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

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <TextInput
                style={isDarkMode ? styles.inputDark : styles.inputLight}
                placeholder={placeholder}
                keyboardType={inputKeyboardType}
                secureTextEntry={isPassword}
                maxLength={maxTextInputLength}
                placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
            />
        </View>
    )
}

export default CustomInputFieldLogin;

const styles = StyleSheet.create({
    containerLight: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        borderWidth: SIZES.BORDER_WIDTH,
        borderColor: LIGHTMODE.BORDER_COLOR,
        justifyContent: "center",
        height: 50,
    },
    containerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        borderWidth: SIZES.BORDER_WIDTH,
        borderColor: DARKMODE.BORDER_COLOR,
        justifyContent: "center",
        height: 50,
    },
    inputLight: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: LIGHTMODE.TEXTINPUT_COLOR,
        textAlign: "center",
    },
    inputDark: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: DARKMODE.TEXTINPUT_COLOR,
        textAlign: "center",
    }
})