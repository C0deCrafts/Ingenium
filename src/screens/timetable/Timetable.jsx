import {View, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useCallback, useEffect, useState} from "react";
import {fetchIcal, getSemesterDates} from "../../api/ingeapiCalendar";
import {format} from 'date-fns';
import {de} from "date-fns/locale";
import {
    AgendaList,
    CalendarProvider,
    ExpandableCalendar,
} from "react-native-calendars";
import {ICONS} from "../../constants/icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {LocaleConfig} from "react-native-calendars/src/index";
import CourseItemForAgenda from "../../components/boxes/CourseItemForAgenda";
import Icon from "../../components/Icon";

function Timetable({navigation}) {
    //import theme, safe area insets, and window dimensions
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);
    const windowWidth = Dimensions.get("window").width;

    const [coursesAreLoading, setCoursesAreLoading] = useState(true);
    const [courseItemsState, setCourseItemsState] = useState([]);
    const [markedDatesState, setMarkedDatesState] = useState({});
    const [calendarBoundaries, setCalendarBoundaries] = useState({
        startDate: null,
        endDate: null
    })

    /*
    * TODO:
    * solve getting the Virtualized list is slow to update error -- according to open issues on Github a library problem, which
    * needs to be solved
    *
    * use code from calendarcontext and utils.js + add my code to those files / think of how to organize my code better
    *
    * check if I can simplify my code + comment and clean all my code
    * */

    /**
     * UseEffect initializes the calendar with data and sets min and max boundaries for the calendar.
     */
    useEffect(() => {
        async function obtainData() {
            try {
                //fetch the ICal Data to be displayed in the calendar
                let eventItems = await fetchIcal();
                setCoursesAreLoading(false);
                setCourseItemsState(eventItems);
                console.log("IN TIMETABLE: Event data successfully received", /*eventItems*/);
            } catch (e) {
                console.log("Error obtaining event data", e);
            }
        }
        obtainData();

        //min and max date for the calendar
        const {start, end} = getSemesterDates();
        const calendarStart = start.toISOString().split('T')[0];
        const calendarEnd = end.toISOString().split('T')[0];
        setCalendarBoundaries({startDate: calendarStart, endDate: calendarEnd});
        console.log(calendarBoundaries);
    }, []);

    /**
     * UseEffect used for calling getMarkedDates.
     * It gets executed when the courses displayed in the calendar change (dependencies: courseItemsState, coursesAreLoading)
     */
    useEffect(() => {
        getMarkedDates();
    }, [coursesAreLoading, courseItemsState]);

    /**
     * Function creates the object expected by the markedDays prop of the expandable calendar. The days contained in the
     *     returned object, will be displayed with dots, indicating days with courses in the calendar view.
     *     The object expects following object structure:
     *     {
     *     '2024-05-16': {marked: true, selectedColor: 'blue'},
     *     '2024-05-13': {marked: true, selectedColor: 'blue'}
     *     }
     *     The markedDatesState is updated with the created object.
     */
    const getMarkedDates = () => {
        if(!coursesAreLoading) {
            const allCourses = [...courseItemsState];
            //if data object on first index of data array (key in each object in courseItemsState) is empty,
            // there are no courses for that day and these days need to be removed
            const filteredCourses = allCourses.filter(c => Object.keys(c.data[0]).length !== 0);
            //marked dates initialized as empty object
            const newMarkedDates = {};
            //for each of the days with courses (sections with not empty data objects)
            //add an entry to the markedDates object
            filteredCourses.forEach((section) => {
                newMarkedDates[section.title] = {marked: true, dotColor: COLOR.BUTTONCOLOR}
            });
            //update state with marked dates
            setMarkedDatesState(newMarkedDates);
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

    /**
     * Renders the courses for the agenda list.
     * UseCallback without a dependency array, caches the function
     * returns the same function instance after every rerender. Without it
     * a new function instance would be created on every rerender potentially
     * triggering other rerenders, and by that impacting performance.
     * (Since the function does not depend on external state or variables which
     * need to be up-to-date, it is not necessary to add dependencies)
     */
    const renderItem = useCallback(({item}) => {
        return (
            <CourseItemForAgenda course={item}/>
        );
    });

    /**
     * Renders the left and right arrow next to the calendar heading
     * @param direction {string}  The direction for which arrow is rendered:
     *                              - 'left' renders left arrow
     *                              - 'right' renders right arrow
     * @returns {JSX.Element} a round blue Icon with a white arrow pointing left or right.
     */
    const renderCalendarArrows = (direction) => {
        if (direction === 'left') {
            return (
                <Icon name={ICONS.TIMETABLEICONS.ARROW_BACK} size={24}/>
            );
        } else if (direction === 'right') {
            return (
                <Icon name={ICONS.TIMETABLEICONS.ARROW_NEXT} size={24}/>
            );
        }
    }

    return (
        <View style={[isDarkMode ? styles.containerDark : styles.containerLight]}>
            <CustomDrawerHeader title="Stundenplan" onPress={() => navigation.openDrawer()}/>
            <CalendarProvider
                //the starting date of the calendar is per default initialized with the date of today (now)
                date={new Date()}
                style={[isDarkMode? styles.calendarProviderDark : styles.calendarProviderLight,
                    styles.calendarProvider]}
            >
                <ExpandableCalendar
                    /*****inherited styling props*****/
                    //allow scrolling 6 months to the future
                    futureScrollRange={6}
                    //allow scrolling 6 months to the past
                    pastScrollRange={6}
                    //setMinDate of Calendar (dates before are greyed out)
                    minDate={calendarBoundaries.startDate ? calendarBoundaries.startDate : undefined }
                    //setMinDate of Calendar (dates after are greyed out)
                    maxDate={calendarBoundaries.endDate ? calendarBoundaries.endDate : undefined }
                    //specified calendar width, to make sure calendar is never wider than container
                    calendarWidth={windowWidth - 2 * SIZES.SPACING_HORIZONTAL_DEFAULT}
                    //style for calendar container element
                    style={isDarkMode ? styles.calendarContainerDark : styles.calendarContainerLight}
                    //for overriding the default theme styles of the calendar
                    theme={{
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
                        //size of day numbers in month view
                        textDayFontSize: SIZES.SCREEN_TEXT_SMALL,
                        //Color of the week days displayed in the month view
                        textSectionTitleColor: isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR,
                        //size of the text for the week days
                        textDayHeaderFontSize: SIZES.SCREEN_TEXT_SMALL,
                        //color of the mark behind the selected day
                        selectedDayBackgroundColor: COLOR.BUTTONCOLOR,
                        //color of 'not active' text f.e. days of next and previous month
                        textDisabledColor: isDarkMode ? DARKMODE.TEXT_COLOR_OPAQUE : LIGHTMODE.TEXT_COLOR_OPAQUE,
                        //set so the marked dates in last week are not cut off
                        weekVerticalMargin: 5,
                    }}
                    /****expandable calendar styling props*****/
                    //arrows next to months - function for rendering custom arrow (as for Calendar component)
                    renderArrow={(direction) => renderCalendarArrows(direction)}
                    //shadow behind calendar view
                    allowShadow={false}
                    //prop to disable week scrolling in expandable calendar in closed position
                    disableWeekScroll={true}
                    //Controls whether the month view of the calendar gets closed on press of a day
                    closeOnDayPress={true}
                    //set the marked dates
                    markingType={'dot'}
                    markedDates={markedDatesState}
                />
                {coursesAreLoading ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large"/>
                    </View>
                    :
                    <AgendaList
                        keyExtractor={(item, index) => item + index}
                        //the array of data to be rendered in the AgendaList
                        sections={courseItemsState}
                        //item corresponds to objects in the data array of each object in array provided to sections
                        renderItem={renderItem}
                        sectionStyle={[
                            isDarkMode ? styles.agendaSectionStyleDark : styles.agendaSectionStyleLight,
                            styles.agendaSectionStyle
                        ]}
                        dayFormatter={(date) => format(date, 'eeee, dd. MMMM. yyyy', {locale: de})}
                        /*
                        solves the scrollToIndexFailed performance error by providing a fixed height for section title
                        and itemHeight -> setting fixed heights helps in pre-allocating
                        space to each item in the component -> which avoids unnecessary calculations
                        while scrolling the list.
                        */
                        infiniteListProps={{
                            itemHeight: 170, // The height of the agendaItem without padding
                            titleHeight: 50, // The height of the section (date) title without padding
                            visibleIndicesChangedDebounce: 250,
                        }}
                    />
                }
            </CalendarProvider>
        </View>
    )
}

export default Timetable;

function getStyles(insets) {
    return StyleSheet.create(
        {
            containerLight: {
                flex: 1,
                backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            },
            containerDark: {
                flex: 1,
                backgroundColor: DARKMODE.BACKGROUNDCOLOR
            },
            textLight: {
                color: LIGHTMODE.TEXT_COLOR,
            },
            textDark: {
                color: DARKMODE.TEXT_COLOR,
            },
            calendarProvider: {
                marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
                marginTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
                marginBottom: insets.bottom,
                borderRadius: SIZES.BORDER_RADIUS
            },
            calendarProviderLight: {
                backgroundColor: LIGHTMODE.BOX_COLOR,
            },
            calendarProviderDark: {
                backgroundColor:DARKMODE.BOX_COLOR,
            },
            calendarContainerLight: {
                marginTop: 10,
                //border to visually separate calendar from timeline
                borderBottomWidth: 1,
                borderBottomColor: LIGHTMODE.BACKGROUNDCOLOR,
            },
            calendarContainerDark: {
                marginTop: 10,
                //border to visually separate calendar from timeline
                borderBottomWidth: 1,
                borderBottomColor: DARKMODE.BACKGROUNDCOLOR,
            },
            agendaSectionStyle: {
                paddingBottom: 10,
                paddingLeft: 0,
                textTransform: 'capitalize',
                fontSize: SIZES.SCREEN_TEXT_NORMAL,
                fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
            },
            agendaSectionStyleLight: {
                color: LIGHTMODE.TEXT_COLOR,
                backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
            },
            agendaSectionStyleDark: {
                color: DARKMODE.TEXT_COLOR,
                backgroundColor: DARKMODE.BACKGROUNDCOLOR
            }
        }
    );
}