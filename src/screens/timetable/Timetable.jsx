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

/**
 * ### Timetable Component
 *
 * This component displays a calendar with all courses for a semester.
 * The upper part of the screen shows an expandable calendar, where all the days with courses are marked and days are clickable.
 * The lower part of the screen shows a scrollable Agenda with all courses for a day. To achieve this behavior,
 * the Agenda Component of the react-native-calendars library is used.
 *
 * #### Functionality:
 * - **Theme Adjustment**: Utilizes the `useTheme` hook to check if the theme is dark or light and adjusts
 * the display accordingly.
 * - **Getting External Data**: Retrieves the course data in Ical format from the Apps backend. The course data is
 * fetched in the CalenderContext and the iCalDataTimetable state  is accessed through the useCalendar hook in the component.
 * - **External Links**: Provides External links for each course leading to the ILIAS platform, which provides further
 * details about the course.
 *
 * #### Structure:
 * 1. **Header with Navigation Drawer**: Includes a button that allows users to open the navigation menu.
 * 2. **Agenda**:
 *  - **Expandable Calendar**: A calendar that can be opened/closed from month to week view, scrolled vertically, and
 * used to select a specific date.
 *  - **Timetable in Agenda Format**: A list that displays all days with all the courses of a semester.
 *
 * #### Elements:
 * - **CustomDrawerHeader**: A custom header component for opening the drawer navigation.
 * - **CourseItemForAgenda**: Component to render individual course items in the agenda.
 * - **DateBoxForAgenda**: Component to render a box for date display for each day in the agenda.
 * - **Agenda**: Agenda component from react-native-calendars.
 *
 * This components goal is to organize course information, making it easy for users to manage their schedules.
 */



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
        //course data from calendar context
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
     * This method is passed to the renderDay prop of the Agenda component. It is responsible
     * for customizing the look of a single day in the Agenda (overrides the default look of React Native Calendars).
     * This is achieved by rendering the DateBoxForAgenda component for each day.
     *
     * The handler receives the two props day and item from the object passed to the prop 'items' of the Agenda component.
     * It is called for each item inside the item array of each date key  (Agenda items prop 'courseItemsState').
     *
     *  Day is undefined for all but the first courseItem in a day.
     *
     * @param day {{}} Current day's date in ISO format.
     * @param item {{}} A courseItem object.
     * @returns {JSX.Element}
     */
    const renderDay = (day, item) => {
        let nameOfDay;
        let date;
        let month;
        let isFirstCourse = true;
        let isEmptyDate;

        //if item is not undefined, it is a date with courses
        //the emptyDate prop of the DateBoxForAgenda must be set to false
        if(item) {
            isEmptyDate = false;
        }

        //if day is defined the props passed to DateBox component are initialized
        if(day){
            nameOfDay = getAbbreviatedDay(day.getDay());
            date = day.getDate().toString().padStart(2, '0');
            month = (day.getMonth() + 1).toString().padStart(2, '0');
        }else{
            //if day is undefined, it means the function is called for another than
            //the first item in that day - the isFirstRenderDayCall prop must be set
            //to false, so the Date Box is not shown multiple times for the same day
            isFirstCourse = false;
        }
        return (
            <DateBoxForAgenda date={date+"."+month}
                              weekDay={nameOfDay}
                              isFirstRenderDayCall={isFirstCourse}
                              isEmptyDate={isEmptyDate}/>
        )
    };

    /**
     * Renders courses in the agenda.
     *
     * Receives the following props:
     * @param item {{}} CourseItem object from data array of 'courseItemsState' object passed to Agendas prop 'items'.
     * @param firstItemInDay {boolean} Boolean value indicating whether it is the first object in the data array.
     *
     * The first item in day prop is used render the component CourseItemsForAgenda only once (when firstItemInDay is true).
     * As the component itself takes care of rendering one or up to multiple courses. This behaviour is necessary as
     * in the UI only one date box should be displayed next to all the courses of a day.
     *
     * @returns {JSX.Element|null} Returns a CourseItemForAgendaComponent which holds all courses of a day.
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
     * Renders an empty box for days without a course in the Agenda. Is called whenever the data array under
     * the specified date key is empty.
     *
     * @returns {JSX.Element} An empty Box with Box background-color corresponding to user's theme preference.
     */
    const renderEmptyDate = () => {
        return (
            <View style={[isDarkMode? styles.containerDark : styles.containerLight, styles.boxSpacing]}>
                <View style={isDarkMode? styles.boxDark:styles.boxLight}/>
            </View>
        )
    }




    /**
     * Sets the default locale of the calendar to German.
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
                    /**
                    * expects an object of key-value pairs with following structure:
                    * key: 'YYYY-MM-ddd' - value: [{agendaItem}, {agendaItem}]
                    */
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
                    //styles for the customization of the calendartheme
                    theme={{
                        //styles used to override the stylesheet of Agenda component
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