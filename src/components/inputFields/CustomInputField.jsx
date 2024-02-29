import {StyleSheet, TextInput, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import BoxIcon from "../BoxIcon";

/**
 * ## CustomInputField Component
 *
 * This component represents a custom input field with an optional icon.
 * It allows users to input text and provides visual feedback based on the current theme (dark/light).
 *
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} keyboardType - The keyboard type for the input field (e.g., "default", "numeric", "email-address").
 * @param {number} maxTextInputLength - The maximum length of the text input.
 * @param {boolean} isPassword - Determines whether the input is a password field (default is false).
 * @param {string} iconName - The name of the icon to be displayed.
 * @param {string} iconColor - The color of the icon.
 * @param {string} iconBoxBackgroundColor - The background color of the icon's box.
 * @param {function} onChangeText - A function that will be called when the text input's content changes. It receives the current text value as its argument.
 * @param {string} value - The value of the input field. This prop is required for controlled input components, where the parent component controls the value of the input field.
 *
 * @example
 * // Inside your component's render method, use the CustomInputField component like this:
 * <CustomInputField
 *   placeholder="Enter your text"
 *   keyboardType="default"
 *   maxTextInputLength={50}
 *   isPassword={false}
 *   iconName="user-icon"
 *   iconColor="#000000"
 *   iconBoxBackgroundColor="#FFFFFF"
 * />
 */
function CustomInputField({
                              placeholder,
                              keyboardType,
                              maxTextInputLength,
                              isPassword,
                              iconName,
                              iconColor,
                              iconBoxBackgroundColor,
                              onChangeText,
                              value,
}){
    const { theme } = useTheme();
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
            <BoxIcon name={iconName} color={iconColor} backgroundColor={iconBoxBackgroundColor}/>
            <TextInput
                style={isDarkMode ? styles.inputDark : styles.inputLight}
                placeholder={placeholder}
                keyboardType={inputKeyboardType}
                secureTextEntry={isPassword}
                maxLength={maxTextInputLength}
                placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                onChangeText={onChangeText}
                value={value}
                returnKeyType="done"
                keyboardAppearance={isDarkMode ? "dark" : "light"}
            />
        </View>
    )
}

export default CustomInputField;

const styles = StyleSheet.create({
    containerLight: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    containerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    inputLight: {
        fontSize: SIZES.TEXTINPUT_SIZE_TASKS,
        color: LIGHTMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        paddingLeft: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    inputDark: {
        fontSize: SIZES.TEXTINPUT_SIZE_TASKS,
        color: DARKMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        paddingLeft: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
})