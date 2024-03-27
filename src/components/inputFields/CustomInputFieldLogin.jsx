import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import Icon from "../Icon";
import {useState} from "react";
import {ICONS} from "../../constants/icons";

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
 * @param iconName - Renders and Icon if the name of an Icon constant specified in constants icon.js is used.
 * @param {function} onChangeTextHandler - Event handler for on change text event.
 * @example
 * <CustomInputFieldLogin
 *   placeholder="Password"
 *   keyboardType={"default"}
 *   isPassword={true}
 *   maxTextInputLength={25}/>
 */
function CustomInputFieldLogin({
              placeholder,
              keyboardType,
              maxTextInputLength,
              isPassword,
              iconName,
              onChangeTextHandler,
              passwordVisible, // Neu hinzugefügt
              togglePasswordVisibility // Neu hinzugefügt
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
        <View style={[isDarkMode ? styles.containerDark : styles.containerLight, styles.container]}>
            {/* Wenn isPassword true ist, rendern wir das Icon in einem TouchableOpacity für Interaktionen */}
            {isPassword ? (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                    <Icon name={iconToShow} size={24} color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR} />
                </TouchableOpacity>
            ) : (
                // Wenn isPassword false ist, wird das Icon ohne TouchableOpacity gerendert
                <Icon name={iconName} size={24} color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR} />
            )}
            <TextInput
                style={[isDarkMode ? styles.inputDark : styles.inputLight, styles.input, {shadowColor: isDarkMode ? "#363636" : "#d0d0d0"}]}
                placeholder={placeholder}
                keyboardType={inputKeyboardType}
                secureTextEntry={isPassword && !passwordVisible}
                maxLength={maxTextInputLength}
                placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                onChangeText={onChangeTextHandler}
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
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    },
    containerLight: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
    },
    containerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
    },
    input: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        textAlign: "left",
    },
    inputLight: {
        color: LIGHTMODE.TEXTINPUT_COLOR,
    },
    inputDark: {
        color: DARKMODE.TEXTINPUT_COLOR,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR
    }
})