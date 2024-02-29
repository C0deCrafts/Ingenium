import {StyleSheet, TextInput, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import BoxIcon from "../BoxIcon";

function CustomInputField({placeholder, keyboardType, maxTextInputLength, isPassword, iconName, iconColor, iconBoxBackgroundColor}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <BoxIcon name={iconName} color={iconColor} backgroundColor={iconBoxBackgroundColor}/>
            <TextInput
                style={isDarkMode ? styles.inputDark : styles.inputLight}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={isPassword}
                maxLength={maxTextInputLength}
                placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                returnKeyType="done"
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