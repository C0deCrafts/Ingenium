import {StyleSheet, View, Text} from "react-native";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

const DateBoxForAgenda = ({isEmptyDate = false, date, weekDay, isOneCourse = true}) => {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    if (isOneCourse) {
        return (<View style={isDarkMode ? styles.backgroundContainerDark : styles.backgroundContainerLight}>
                    <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight,
                        !isEmptyDate && styles.blueBorder]}>
                        <Text style={[styles.weekDay, isDarkMode ? styles.textDark : styles.textLight]}>{weekDay}</Text>
                        <Text style={[styles.date, isDarkMode ? styles.textDark : styles.textLight]}>{date}</Text>
                        {!isOneCourse && <Text>TEST</Text>}
                    </View>
                </View>)
    } else {
        return null;
    }
};

export default DateBoxForAgenda;

const styles = StyleSheet.create(
    {
        container: {
            marginTop: SIZES.SPACING_VERTICAL_SMALL,
            marginRight: 10,
            borderRadius: 5,
            justifyContent: "space-between",
            padding: 15,
            flex: 1
        },
        containerLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
        },
        containerDark: {
            backgroundColor: DARKMODE.BOX_COLOR,
        },
        backgroundContainerLight: {
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            width: '35%',
        },
        backgroundContainerDark: {
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            width: '35%',
        },
        blueBorder: {
            borderLeftColor: COLOR.BUTTONCOLOR,
            borderLeftWidth: 5,
        },
        date: {
            fontSize: SIZES.SCREEN_TEXT_SMALL,
            alignSelf: "flex-end"
        },
        weekDay: {
            fontSize: SIZES.SCREEN_TEXT_LARGE - 10,
        },
        textLight: {
            color: LIGHTMODE.TEXT_COLOR,
        },
        textDark: {
            color: DARKMODE.TEXT_COLOR,
        }
    }
);