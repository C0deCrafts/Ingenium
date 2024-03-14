import {Text, StyleSheet, TouchableOpacity, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import SquareIcon from "../SquareIcon";

function NextTaskButton({
                             buttonTextLeft,
                             buttonTextRight,
                             boxBackgroundColor,
                             onPress,
                         }) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <TouchableOpacity onPress={onPress}
                          style={[
                              isDarkMode ? styles.containerDark : styles.containerLight,
                          ]}>
            <View style={{
                width: 70,
                height: 60,
                backgroundColor: boxBackgroundColor,
                borderBottomLeftRadius: SIZES.BORDER_RADIUS,
                borderTopLeftRadius: SIZES.BORDER_RADIUS,
            }}></View>
            <Text style={isDarkMode ? styles.buttonLabelDark : styles.buttonLabelLight}>{buttonTextLeft}</Text>
            <Text style={isDarkMode ? styles.secondButtonLabelDark : styles.secondButtonLabelLight}>{buttonTextRight}</Text>
        </TouchableOpacity>
    )
}

export default NextTaskButton;

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
        marginLeft: 15,
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
        color: LIGHTMODE.TEXT_COLOR,
        marginRight: 15,
    },
    secondButtonLabelDark: {
        fontSize: SIZES.TEXT_SIZE - 3,
        color: DARKMODE.TEXT_COLOR,
        marginRight: 15,
    },
    boxColor: {
        width: 50,
        height: 50,
    }
})