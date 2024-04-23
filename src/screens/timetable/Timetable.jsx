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
    const [courseItemsState, setCourseItemsState] = useState({});
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

    /**
     * Handler which renders the empty dates
     * @returns {JSX.Element} am empty view element as on days without courses nothing
     *                        should be rendered
     */

    const renderEmptyDataHandler = () => {
        return (
            <View style={[styles.emptyDataContainer]}>
                <Text style={[isDarkMode? styles.textDark : styles.text, styles.textNormal]}>
                    Für diesen Zeitraum sind keine Termine verfügbar.
                </Text>
            </View>
        )
    }

    const renderEmptyDateHandler = () => {
        return (
            <View style={[isDarkMode ? styles.emptySeparatorDark : styles.emptySeparatorLight]}>
            </View>
        );
    };



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

    /**PROP RENDERITEM:
     * Renders the courses for the agenda list.
     * UseCallback without a dependency array, caches the function
     * returns the same function instance after every rerender. Without it
     * a new function instance would be created on every rerender potentially
     * triggering other rerenders, and by that impacting performance.
     * (Since the function does not depend on external state or variables which
     * need to be up-to-date, it is not necessary to add dependencies)
     */
    return (
        <View style={[isDarkMode? styles.containerDark : styles.containerLight, styles.container]}>
            <CustomDrawerHeader title="Stundenplan" onPress={() => navigation.openDrawer()}/>
            <View style={styles.calendarContainer}>
                <Agenda
                    items={courseItemsState}
                    renderEmptyDate={renderEmptyDateHandler}
                    renderEmptyData={renderEmptyDataHandler}
                    renderItem={useCallback((item) => <CourseItemForAgenda course={item}/>)}
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
            emptySeparatorLight: {
                height: 1,
                backgroundColor: LIGHTMODE.TEXT_COLOR,
            },
            emptySeparatorDark: {
                height: 1,
                backgroundColor: DARKMODE.TEXT_COLOR,
            }
        }
    );
}