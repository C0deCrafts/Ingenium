import {View, StyleSheet} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useEffect, useState} from "react";
import { getDay as getAbbreviatedDay, getSemesterDates} from "../../utils/utils";
import {Agenda} from "react-native-calendars";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {LocaleConfig} from "react-native-calendars/src/index";
import CourseItemForAgenda from "../../components/boxes/CourseItemForAgenda";
import DateBoxForAgenda from "../../components/boxes/DateBoxForAgenda";
import {useCalendar} from "../../context/CalendarContext";

function Timetable({navigation}) {
    //import theme, safe area insets, and window dimensions
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    //import the fetched IcalData with structure needed by Agenda
    const {iCalDataTimetable} = useCalendar();


    //object holding the courses displayed in the Agenda
    const [courseItemsState, setCourseItemsState] = useState({});
    //object holding the starting and ending date of the current semester
    const [calendarBoundaries, setCalendarBoundaries] = useState({
        startDate: null,
        endDate: null
    });


    /**
     * UseEffect initializes the calendar with data and sets min and max boundaries for the calendar.
     * The empty dependency array causes it to run on the first mounting of the component. The data
     * is provided from CalendarContext and set to the state 'courseItemsState'. The min- and max- boundaries of the calendar
     * are set to the start and end date of the semester.
     */
    useEffect(() => {


        if(iCalDataTimetable) {
            setCourseItemsState(iCalDataTimetable);
        }


        //min and max date for the calendar
        const {start, end} = getSemesterDates();
        const calendarStart = start.toISOString().split('T')[0];
        const calendarEnd = end.toISOString().split('T')[0];
        setCalendarBoundaries({startDate: calendarStart, endDate: calendarEnd});
    }, []);



    /**
     *
     * @param day
     * @param item
     * @returns {JSX.Element}
     */
    const renderDay = (day, item) => {
        let nameOfDay;
        let date;
        let month;
        let isOneCurse = true;
        let isEmptyDate;

        if(item) {
            isEmptyDate = false;
        }

        if(day){
            nameOfDay = getAbbreviatedDay(day.getDay());
            date = day.getDate().toString().padStart(2, '0');
            month = (day.getMonth() + 1).toString().padStart(2, '0');
        }else{
            isOneCurse = false;
        }
        return (
            <DateBoxForAgenda date={date+"."+month}
                              weekDay={nameOfDay}
                              isOneCourse={isOneCurse}
                              isEmptyDate={isEmptyDate}/>
        )
    };

    const renderEmptyDate = () => {
        return (
            <View style={[isDarkMode? styles.containerDark : styles.containerLight, styles.boxSpacing]}>
                <View style={isDarkMode? styles.boxDark:styles.boxLight}/>
            </View>
        )
    }

    /**
     * Renders courses in the agenda.
     *
     * @param item
     * @param firstItemInDay
     * @returns {JSX.Element|null}
     */
    const renderItem = (item, firstItemInDay) => {
        if (firstItemInDay) {
            const coursesOfDay = courseItemsState[item.courseDate];
            return (
                <CourseItemForAgenda courses={coursesOfDay}/>
            );
        } else {
            return null;
        }
    }


    /**
     * sets the default locale of the calendar to German.
     * @type {{today: string, dayNames: string[], monthNamesShort: string[], dayNamesShort: string[], monthNames: string[]}}
     */
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
        monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        today: 'Heute'
    };
    LocaleConfig.defaultLocale = 'de';


    return (
        <View style={[isDarkMode? styles.containerDark : styles.containerLight, styles.container]}>
            <CustomDrawerHeader title="Stundenplan" onPress={() => navigation.openDrawer()}/>
            <View style={styles.calendarContainer}>
                <Agenda
                    items={courseItemsState}
                    renderItem={(item, firstItemInDay) => renderItem(item, firstItemInDay)}
                    renderDay={renderDay}
                    renderEmptyDate={renderEmptyDate}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                    firstDay={1}
                    hideKnob={false}
                    showClosingKnob={true}
                    //min- and maxDates -> in the calendat dates before and after that
                    // are greyed out and not clickable
                    minDate={calendarBoundaries.startDate}
                    maxDate={calendarBoundaries.endDate}
                    theme={{
                        "stylesheet.agenda.main": {
                            reservations: {
                                backgroundColor: isDarkMode ? DARKMODE.BACKGROUNDCOLOR : LIGHTMODE.BACKGROUNDCOLOR,
                                flex: 1,
                                marginTop: 120,
                            },
                            dayHeader: {
                                width: 32,
                                textAlign: 'center',
                                fontSize: SIZES.SCREEN_TEXT_SMALL,
                                fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
                                color: isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR
                            },
                            header: {
                                overflow: 'hidden',
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                height: '101%', //damit der markierte kreis nicht abgeschnitten wird
                                width: '100%',
                                borderRadius: SIZES.BORDER_RADIUS
                            },
                        },
                        //backgroundcolor of the month-calendar view
                        calendarBackground: isDarkMode ? DARKMODE.BOX_COLOR : LIGHTMODE.BOX_COLOR,
                        //color of the header between left and right arrow
                        monthTextColor: isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR,
                        //fontweight of the header between left and right arrow
                        textMonthFontWeight: SIZES.SCREEN_HEADER_WEIGHT,
                        //fontsize of the header between left and right arrow
                        textMonthFontSize: SIZES.SCREEN_TEXT_NORMAL,

                        //color of days of the month
                        dayTextColor: isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR,
                        //color of today (number in month calendar view representing today)
                        todayTextColor: COLOR.BUTTONCOLOR,
                        textDayHeaderFontWeight: SIZES.SCREEN_HEADER_WEIGHT,
                        textDayHeaderFontSize: SIZES.SCREEN_TEXT_NORMAL,

                        //Color of the week days displayed in the month view
                        textSectionTitleColor: isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR,

                        //color of the mark behind the selected day
                        selectedDayBackgroundColor: COLOR.BUTTONCOLOR,
                        //color of 'not active' text f.e. days of next and previous month
                        textDisabledColor: isDarkMode ? DARKMODE.TEXT_COLOR_OPAQUE : LIGHTMODE.TEXT_COLOR_OPAQUE,
                    }}
                    style={[isDarkMode ? styles.agendaContainerDark : styles.agendaContainerLight]}
                />
            </View>
        </View>
    )
}

export default Timetable;

function getStyles(insets) {
    return StyleSheet.create(
        {
            container: {
                paddingBottom: insets.bottom,
            },
            containerLight: {
                flex: 1,
                backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            },
            containerDark: {
                flex: 1,
                backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            },
            calendarContainer: {
                paddingTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
                paddingHorizontal: SIZES.SPACING_VERTICAL_DEFAULT,
                flex: 1,
            },
            textLight: {
                color: LIGHTMODE.TEXT_COLOR,
            },
            textDark: {
                color: DARKMODE.TEXT_COLOR,
            },
            textNormal: {
                fontSize: SIZES.SCREEN_TEXT_NORMAL
            },
            textAlignCenter: {
                textAlign: "center",
            },
            emptyDataContainer: {
                paddingTop: SIZES.SPACING_HORIZONTAL_DEFAULT,
                paddingVertical: SIZES.SPACING_HORIZONTAL_DEFAULT
            },
            itemSeparatorLight: {
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                padding: 10,
                backgroundColor: LIGHTMODE.BACKGROUNDCOLOR, // Hintergrundfarbe für den Eintrag
            },
            itemSeparatorDark: {
                borderBottomWidth: 1,
                borderBottomColor: '#666',
                padding: 10,
                backgroundColor: DARKMODE.BACKGROUNDCOLOR, // Hintergrundfarbe für den Eintrag
            },
            agendaContainerLight: {
                backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
                borderRadius: SIZES.BORDER_RADIUS
            },
            agendaContainerDark: {
                backgroundColor: DARKMODE.BACKGROUNDCOLOR,
                borderRadius: SIZES.BORDER_RADIUS,
            },
            boxLight: {
                backgroundColor: LIGHTMODE.BOX_COLOR,
                borderRadius: SIZES.BORDER_RADIUS,
                flex: 1
            },
            boxDark: {
                backgroundColor: DARKMODE.BOX_COLOR,
                borderRadius: SIZES.BORDER_RADIUS,
                flex: 1
            },
            boxSpacing: {
                paddingTop: SIZES.SPACING_VERTICAL_SMALL,
            }
        }
    );
}