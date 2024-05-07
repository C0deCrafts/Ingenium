import {Calendar, LocaleConfig} from 'react-native-calendars';
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../constants/styleSettings";
import {View, StyleSheet} from "react-native";
import Icon from "./Icon";
import {ICONS} from "../constants/icons";
import {useTheme} from "../context/ThemeContext";
import {getCurrentDateStringForReactNativeCalendar} from "../utils/utils";
import {useState} from "react";

function CustomCalendar({onDayPress, initialDate}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;
    const minDate = getCurrentDateStringForReactNativeCalendar();

    const [selectedDate, setSelectedDate] = useState(initialDate);

    LocaleConfig.locales['de'] = {
        monthNames: [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember'
        ],
        monthNamesShort: ['Jan.', 'Feb.', 'März', 'April', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
        dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        dayNamesShort: ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'],
        today: "Heute"
    };
    LocaleConfig.defaultLocale = 'de';

    const handleDayPress = (day) => {
        console.log('ausgewählter Tag', day);
        setSelectedDate(day.dateString);
        if (onDayPress) {
            onDayPress(day.dateString); // Weiterleitung des ausgewählten Datums an die Eltern-Komponente
        }
    }

    const markedDates = {
        [selectedDate]: {
            selected: true,
            marked: false,
            selectedColor: COLOR.BUTTONCOLOR,
            selectedTextColor:COLOR.BUTTONLABEL,
            customStyles: {
                container: {
                    borderRadius: 0
                }
            }
        }
    };

    return (
        <Calendar
            style={styles.calendarStyle}
            theme={{
                calendarBackground: isDarkMode ? DARKMODE.BOX_COLOR : LIGHTMODE.BOX_COLOR,
                textSectionTitleColor: isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR,
                textMonthFontSize: SIZES.SCREEN_TEXT_NORMAL + 2, // Größe des Monatsnamens im Header
                textMonthFontWeight: SIZES.DRAWER_HEADER_FONTWEIGHT, // Schriftart: Fett
                monthTextColor: isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR, // Farbe des Monatsnamens
                dayTextColor: isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR,
                todayTextColor: COLOR.BUTTONCOLOR,
                textDisabledColor: isDarkMode ? DARKMODE.TEXT_COLOR_OPAQUE : LIGHTMODE.TEXT_COLOR_OPAQUE,
            }}
            markedDates={markedDates}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={minDate}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={handleDayPress}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"MMMM yyyy"}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => (
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.ICONCOLOR_CUSTOM_BLUE, width: 25, height: 25, borderRadius: SIZES.BORDER_RADIUS }}>
                    {direction === 'left' ? (
                        <Icon name={ICONS.BACK.ACTIVE} color={COLOR.BUTTONLABEL} size={20}/>
                    ) : (
                        <Icon name={ICONS.FORWARD.ACTIVE} color={COLOR.BUTTONLABEL} size={20}/>
                    )}
                </View>
            )}
            //onPressArrowLeft={handleOnPressArrowLeft}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
        />
    )
}

export default CustomCalendar;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})