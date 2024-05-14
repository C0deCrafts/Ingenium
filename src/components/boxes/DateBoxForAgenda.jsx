import {StyleSheet, View, Text} from "react-native";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

/**
 * ### Date Box For Agenda Component
 *
 * Renders a Date Box containing the current date and weekday to the left of the courses in the Agenda.
 * For a fast grasp of all courses, It has a blue border if there are courses and no border if there are no
 * courses on that day.
 *
 * @param isEmptyDate {boolean} A boolean value controlling whether the date box is displayed with a blue border:
 *                              true: No border is visible.
 *                              false: Border is visible.
 * @param date {string} A string representing the date.
 * @param weekDay {string} A string representing the weekday.
 * @param isFirstRenderDayCall {boolean} A boolean value which ensures the dateBox is rendered only once for each day:
 *                              true: The Date Box is rendered.
 *                              false: Nothing is rendered - null is returned.
 * @returns {JSX.Element||null} A date Box which stretches all courses of a day to the left.
 *
 * @example
 * // Import the DateBoxForAgenda component
 * import DateBoxForAgenda from "../../components/DateBoxForAgenda";
 *
 * // Return the component in the renderDay handler of the Agenda for each day:
 * <DateBoxForAgenda date={"04.02"}
 *                               weekDay={"MO"}
 *                               isFirstCourse={true}
 *                               isEmptyDate={false}/>
 *
 */

const DateBoxForAgenda = ({isEmptyDate = true, date, weekDay, isFirstRenderDayCall = true}) => {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    if (isFirstRenderDayCall) {
        return (
            <View style={isDarkMode ? styles.backgroundContainerDark : styles.backgroundContainerLight}>
                <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight,
                    !isEmptyDate && styles.blueBorder]}>
                    <Text style={[styles.weekDay, isDarkMode ? styles.textDark : styles.textLight]}>{weekDay}</Text>
                    <Text style={[styles.date, isDarkMode ? styles.textDark : styles.textLight]}>{date}</Text>
                </View>
            </View>
        )
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