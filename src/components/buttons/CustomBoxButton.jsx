import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import BoxIcon from "../BoxIcon";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import {ICONS} from "../../constants/icons";

/**
 * ## CustomBoxButton Component
 *
 * This component represents a custom button with a box icon, left and right text labels, and an optional forward icon.
 * It allows users to interact with the button by pressing it.
 * The appearance of the button is determined by the current theme (dark/light).
 *
 * @param {string} buttonTextLeft - The text label displayed on the left side of the button.
 * @param {string} buttonTextRight - The text label displayed on the right side of the button.
 * @param {string} iconName - The name of the icon to be displayed inside the box.
 * @param {string} iconColor - The color of the icon.
 * @param {string} iconBoxBackgroundColor - The background color of the icon's box.
 * @param {Function} onPress - Function to be called when the button is pressed.
 * @param {boolean} [showForwardIcon=true] - Optional. Determines whether to display the forward icon (default is true).
 * @param {number} [extraPadding=0] - Optional. Extra padding to be applied to the button (default is 0).
 *
 * @example
 * // Inside your component's render method, use the CustomBoxButton component like this:
 * <CustomBoxButton
 *   buttonTextLeft={"Liste"}
 *   buttonTextRight={"Ingenium"}
 *   iconName={"list-icon"}
 *   iconColor={"#FFFFFF"}
 *   iconBoxBackgroundColor={"#0080FF"}
 *   onPress={() => handlePress()}
 *   showForwardIcon={true}
 *   extraPadding={10}
 * />
 *
 * // Note: This component can be used both for buttons within screens and within modal dialogs.
 * // You need showForwardIcon and extraPadding props.
 */
function CustomBoxButton({
                             buttonTextLeft,
                             buttonTextRight,
                             iconName,
                             iconColor,
                             iconBoxBackgroundColor,
                             onPress,
                             showForwardIcon = true,
                             extraPadding = 0
                         }) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    // Calculate total padding including extraPadding
    const containerPadding = 10 + extraPadding;

    return (
        <TouchableOpacity onPress={onPress}
                          style={[
                              isDarkMode ? styles.containerDark : styles.containerLight,
                              {padding: containerPadding} // Applying the calculated padding
                          ]}>
            <BoxIcon name={iconName} color={iconColor} backgroundColor={iconBoxBackgroundColor}/>
            <Text style={isDarkMode ? styles.buttonLabelDark : styles.buttonLabelLight}>{buttonTextLeft}</Text>
            <Text style={isDarkMode ? styles.secondButtonLabelDark : styles.secondButtonLabelLight}>{buttonTextRight}</Text>
            {showForwardIcon && (
                <BoxIcon name={ICONS.FORWARD.ACTIVE} color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                         backgroundColor={isDarkMode ? DARKMODE.BOX_COLOR : LIGHTMODE.BOX_COLOR}/>
            )}
        </TouchableOpacity>
    )
}

export default CustomBoxButton;

const styles = StyleSheet.create({
    containerLight: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        alignItems: "center",
    },
    buttonLabelLight: {
        flexGrow: 1,
        marginLeft: 10,
        fontSize: SIZES.TEXT_SIZE,
        color: LIGHTMODE.TEXT_COLOR
    },
    buttonLabelDark: {
        flexGrow: 1,
        marginLeft: 10,
        fontSize: SIZES.TEXT_SIZE,
        color: DARKMODE.TEXT_COLOR
    },
    secondButtonLabelLight: {
        fontSize: SIZES.TEXT_SIZE - 3,
        color: LIGHTMODE.TEXT_COLOR
    },
    secondButtonLabelDark: {
        fontSize: SIZES.TEXT_SIZE - 3,
        color: DARKMODE.TEXT_COLOR
    }
})