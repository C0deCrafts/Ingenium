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
 * @param leftComponent - Optional custom component to be rendered on the left side of the button.
 *
 * @example
 * // Import the NextTaskBox component
 * import NextTaskBox from "../../components/NextTaskBox";
 * // Inside your component's render method, use the NextTaskBox component like this:
 * <NextTaskBox
 *    buttonTextLeft={"Task 1"}
 *    buttonTextRight={"in 2 days"}
 *    leftComponent={() => (
 *        <SquareIcon name={task.listIcon}
 *                    backgroundColor={task.iconBackgroundColor}
 *                    isUserIcon={true}
 *                    size={60}
 *                    customIconSize={35}
 *                    />
 *        )}
 * />
 * // This will render a next task button with the specified information and styling.
 */
function NextTaskBox({
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

export default NextTaskBox;

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