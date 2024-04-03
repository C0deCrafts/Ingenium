import {Text, StyleSheet, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

/**
 * ### Next Course Box Component
 *
 * Renders a box displaying information about the next course.
 * This component accepts props such as headerTitle, headerBackgroundColor, date, timeStart, timeEnd, and containerStyle.
 *
 * @param headerTitle - The title of the course.
 * @param headerBackgroundColor - The background color of the header.
 * @param date - The date of the course.
 * @param timeStart - The start time of the course.
 * @param timeEnd - The end time of the course.
 * @param containerStyle - Custom styles for the container.
 * @returns {JSX.Element} - The rendered next course box as a React element.
 *
 * @example
 * // Import the NextCourseBox component
 * import NextCourseBox from "../../components/NextCourseBox";
 * // Inside your component's render method, use the NextCourseBox component like this:
 * <NextCourseBox
 *    headerTitle={"Math Course"}
 *    headerBackgroundColor={"#3498db"}
 *    date={"Monday, March 21"}
 *    timeStart={"10:00 AM"}
 *    timeEnd={"12:00 PM"}
 *    containerStyle={{marginTop: 10}}
 * />
 * // This will render a next course box with the specified information and styling.
 */
function NextCourseBox({
                           headerTitle,
                           headerBackgroundColor,
                           date,
                           timeStart,
                           timeEnd,
                           containerStyle,
                       }) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <View
            style={[isDarkMode ? styles.containerDark : styles.containerLight, containerStyle]}>
            <View style={{
                backgroundColor: headerBackgroundColor,
                borderTopLeftRadius: SIZES.BORDER_RADIUS,
                borderTopRightRadius: SIZES.BORDER_RADIUS,
                width: "100%"
            }}>
                <Text style={styles.headerTitle}>{headerTitle}</Text>
            </View>
            <Text style={isDarkMode ? styles.textDateDark : styles.textDateLight}>{date}</Text>
            <Text style={isDarkMode ? styles.textTimeDark : styles.textTimeLight}>{timeStart} - {timeEnd}</Text>
        </View>
    )
}

export default NextCourseBox;

const styles = StyleSheet.create({
    containerLight: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "column",
        justifyContent: "center",
    },
    containerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "column",
        justifyContent: "center",
    },
    headerTitle: {
        color: "white",
        fontSize: SIZES.SCREEN_TEXT_SMALL,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        padding: 10
    },
    textDateLight: {
        paddingTop: 20,
        paddingHorizontal: 10,
        fontSize: SIZES.SCREEN_TEXT_SMALL,
        color: LIGHTMODE.TEXT_COLOR,
    },
    textDateDark: {
        paddingTop: 20,
        paddingHorizontal: 10,
        fontSize: SIZES.SCREEN_TEXT_SMALL,
        color: DARKMODE.TEXT_COLOR,
    },
    textTimeLight: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 20,
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textTimeDark: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 20,
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    }
})