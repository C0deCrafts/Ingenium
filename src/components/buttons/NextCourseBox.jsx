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
        //height: 200
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
        paddingLeft: 10,
        fontSize: SIZES.SCREEN_TEXT_SMALL,
        color: LIGHTMODE.TEXT_COLOR,
    }, textDateDark: {
        paddingTop: 20,
        paddingLeft: 10,
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_SMALL,
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