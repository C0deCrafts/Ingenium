import {StyleSheet, TextInput, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../constants/styleSettings";
import {useTheme} from "../constants/context/ThemeContext";

function CustomInputFieldLogin({placeholder, keyboardType, maxTextInputLength, isPassword}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <TextInput
                style={isDarkMode ? styles.inputDark : styles.inputLight}
                placeholder={placeholder}
                keyboardType={keyboardType}
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
        marginHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
        borderRadius: SIZES.BORDER_RADIUS,
        borderWidth: SIZES.BORDER_WIDTH,
        borderColor: LIGHTMODE.BORDER_COLOR,
        justifyContent: "center",
        height: 50,
    },
    containerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
        marginHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
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