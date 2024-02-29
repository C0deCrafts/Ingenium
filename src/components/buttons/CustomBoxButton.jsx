import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import BoxIcon from "../BoxIcon";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import {ICONS} from "../../constants/icons";

function CustomBoxButton({
                             buttonTextLeft,
                             buttonTextRight,
                             iconName,
                             iconColor,
                             iconBoxBackgroundColor,
                             onPress,
                             showForwardIcon = true, // Standardwert ist true, sodass das Icon angezeigt wird, wenn nichts angegeben ist
                             extraPadding = 0 // Standardwert für zusätzliches Padding ist 0
                         }) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    // Berechnung des Gesamtpaddings unter Berücksichtigung des extraPadding
    const containerPadding = SIZES.SPACING_HORIZONTAL_DEFAULT / 2 + extraPadding;

    return (
        <TouchableOpacity onPress={onPress}
                          style={[
                              isDarkMode ? styles.containerDark : styles.containerLight,
                              {padding: containerPadding} // Anwenden des berechneten Paddings (dies ergibt die Möglichkeit die Komponente öfters zu verwenden und das passing anzupassen
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
        //padding: SIZES.SPACING_HORIZONTAL_DEFAULT / 2,
    },
    containerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        alignItems: "center",
        //padding: SIZES.SPACING_HORIZONTAL_DEFAULT,
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