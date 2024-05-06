import {Text, StyleSheet, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

/**
 * ### Next Task Button Component
 *
 * Renders a button to represent the next task.
 * This component accepts props such as buttonTextLeft, buttonTextRight, boxBackgroundColor, and onPress.
 *
 * @param buttonTextLeft - The text to be displayed on the left side of the button.
 * @param buttonTextRight - The text to be displayed on the right side of the button.
 * @param boxBackgroundColor - The background color of the button.
 *
 * @example
 * // Import the NextTaskButton component
 * import NextTaskButton from "../../components/NextTaskButton";
 * // Inside your component's render method, use the NextTaskButton component like this:
 * <NextTaskButton
 *    buttonTextLeft={"Task 1"}
 *    buttonTextRight={"in 2 days"}
 *    boxBackgroundColor={"#3498db"}
 *    onPress={() => console.log("Button pressed")}
 * />
 * // This will render a next task button with the specified information and styling.
 */
function NextTaskButton({
                             buttonTextLeft,
                             buttonTextRight,
                             leftComponent: LeftComponent,
                         }) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    // Dynamically determine text color based on buttonTextRight
    const secondButtonLabelStyle = (buttonTextRight.toLowerCase().includes('jetzt fällig') || buttonTextRight.toLowerCase().includes('überfällig')) && styles.overdueText;

    return (
        <View style={[
            isDarkMode ? styles.containerDark : styles.containerLight,
        ]}>
            {/*<View style={{
                width: 70,
                height: 60,
                backgroundColor: boxBackgroundColor,
                borderBottomLeftRadius: SIZES.BORDER_RADIUS,
                borderTopLeftRadius: SIZES.BORDER_RADIUS,
            }}></View>*/}
            {LeftComponent && <LeftComponent/>}
            <Text style={isDarkMode ? styles.buttonLabelDark : styles.buttonLabelLight}
                  numberOfLines={1}
                  ellipsizeMode="tail"
            >{buttonTextLeft}</Text>
            <Text
                style={[isDarkMode ? styles.secondButtonLabelDark : styles.secondButtonLabelLight, secondButtonLabelStyle]}>{buttonTextRight}</Text>
        </View>
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
        width: 10,
        marginLeft: 15,
        fontSize: SIZES.TEXT_SIZE,
        color: LIGHTMODE.TEXT_COLOR,
        marginRight: 10
    },
    buttonLabelDark: {
        flexGrow: 1,
        marginLeft: 10,
        fontSize: SIZES.TEXT_SIZE,
        color: DARKMODE.TEXT_COLOR,
        marginRight: 10
    },
    secondButtonLabelLight: {
        fontSize: SIZES.SCREEN_TEXT_XS,
        color: LIGHTMODE.TEXT_COLOR,
        marginRight: 15,
    },
    secondButtonLabelDark: {
        fontSize: SIZES.SCREEN_TEXT_XS,
        color: DARKMODE.TEXT_COLOR,
        marginRight: 15,
    },
    boxColor: {
        width: 50,
        height: 50,
    },
    overdueText: {
        color: 'red',
    },
})