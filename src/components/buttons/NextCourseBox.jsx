import {Text, StyleSheet, View} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

function NextCourseBox({
                           headerTitle,
                           headerBackgroundColor,
                           date,
                           timeStart,
                           timeEnd,
                       }) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <View
            style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <View style={{
                backgroundColor: headerBackgroundColor,
                borderTopLeftRadius: SIZES.BORDER_RADIUS,
                borderTopRightRadius: SIZES.BORDER_RADIUS,
                width: "100%"
            }}>
                <Text style={styles.headerTitle}>{headerTitle}</Text>
            </View>
            <Text style={styles.textDate}>{date}</Text>
            <Text style={styles.textTime}>{timeStart} - {timeEnd}</Text>
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
    textDate: {
        paddingTop: 20,
        paddingLeft: 10,
        fontSize: SIZES.SCREEN_TEXT_SMALL,
    },
    textTime: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 20,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    }
})