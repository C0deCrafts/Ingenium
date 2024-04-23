import {View, StyleSheet, Dimensions, ActivityIndicator, Text} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useCallback, useEffect, useState} from "react";
import {fetchIcal, fillAgendaObjectWithCourseData, getSemesterDates} from "../../api/ingeapiCalendar";
import {format} from 'date-fns';
import {de} from "date-fns/locale";
import {
    Agenda,
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
    }, []);

    const renderEmptyDateHandler = () => {
        return (
            <View>
                <Text>Keine Termine</Text>
            </View>
        );
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
        <View style={[isDarkMode? styles.containerDark : styles.containerLight, styles.container]}>
            <CustomDrawerHeader title="Stundenplan" onPress={() => navigation.openDrawer()}/>
            <View style={styles.calendarContainer}>
                <Agenda
                    items={courseItemsState}
                    renderEmptyDate={renderEmptyDateHandler}
                    renderItem={(item) => renderItem(item)}
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
                marginBottom: insets.bottom,
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
            }
        }
    );
}