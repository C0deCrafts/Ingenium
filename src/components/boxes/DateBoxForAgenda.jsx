import {StyleSheet, View, Text} from "react-native";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

const DateBoxForAgenda = ({isEmptyDate = false, date, weekDay}) => {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight,
            !isEmptyDate && styles.blueBorder]}>
            <Text style={styles.weekDay}>{weekDay}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
    );
};

export default DateBoxForAgenda;

const styles = StyleSheet.create(
    {
        container: {
            marginTop:SIZES.SPACING_VERTICAL_DEFAULT,
            marginRight: SIZES.SPACING_HORIZONTAL_DEFAULT,
            height: 200,
            borderRadius: 5,
            justifyContent: "space-between",
            padding: 15,
            width: '35%'
        },
        containerLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
        },
        containerDark: {
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
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
            fontSize: SIZES.SCREEN_TEXT_LARGE,
        },
        textLight: {
            color: LIGHTMODE.TEXT_COLOR,
        },
        textDark: {
            color: DARKMODE.TEXT_COLOR,
        }
    }
);