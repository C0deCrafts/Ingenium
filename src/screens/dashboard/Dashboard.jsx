import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {COLOR, DARKMODE, LIGHTMODE, SIZES, windowHeight} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {useDatabase} from "../../context/DatabaseContext";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import ImageViewer from "../../components/ImageViewer";
import NextTaskButton from "../../components/buttons/NextTaskButton";
import NextCourseBox from "../../components/boxes/NextCourseBox";
import {loadProfileImage, saveProfileImage} from "../../storages/asyncStorage";
import {motivationalQuotes} from "../../constants/motivationalQuotes";
import {useLocation} from "../../context/LocationContext";
import fetchCurrentWeather from '../../api/weather';
import {useAuth} from "../../context/AuthContext";
import LoadingComponent from "../../components/LoadingComponent";
import {useCalendar} from "../../context/CalendarContext";
import {getDay, formatLocalTime, filterAndSortCourses} from "../../utils/utils";
import Greeting from "../../components/Greeting";

/**
 * ### Dashboard
 * Provides the main user interface for displaying the user's profile,
 * upcoming courses, tasks, weather updates, and motivational quotes.
 *
 * Features:
 * - User can update their profile picture by tapping on it, which opens the image picker.
 * - Displays a personalized greeting based on the time of day.
 * - Shows current weather conditions using data fetched from an external API.
 * - Randomly displays a motivational quote from a predefined list.
 * - Presents a list of upcoming courses and tasks, with the number of tasks displayed
 *   dynamically adjusted based on the screen height.
 */
function Dashboard({navigation}) {
    // Theme context to switch between dark and light mode.
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {isDbReady, loadLists} = useDatabase();
    // State for managing the selected profile image.
    const [selectedImage, setSelectedImage] = useState(null);
    // Fetches and sets weather data based on the user's location.
    const locationName = useLocation();
    const [weatherData, setWeatherData] = useState({condition: '', icon: ICONS.WEATHER_ICONS.DEFAULT});

    const date = new Date().getDate().toString().padStart(2, '0');
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');

    const day = new Date().getDay();
    const [quote, setQuote] = useState("");

    const { userData } = useAuth();

    const { icalData, getCourseNameByNumber } = useCalendar();
    const [nextCourses, setNextCourses] = useState([]);
    const [nextTasks, setNextTasks] = useState([]);

    const {tasks} = useDatabase();

    //das älteste Datum finden --> sortieren nach Datum
    //nur die ersten
    const tasksSortedByCreationDate = tasks.sort((a,b) => {
        const dateA = new Date(a.creationDate);
        const dateB = new Date(b.creationDate);
        return dateA - dateB;
    });

    useEffect(() => {
        let nextTasks = createNextTasksArray(tasksSortedByCreationDate);
        setNextTasks(nextTasks);
    }, [tasks]);

    /**
     * Creates an array of next task objects which have the following structure:
     *                 id: id of task ,
     *                 name: title of task,
     *                 daysLeft: days until it needs to be completed (by now not implemented),
     *                 backgroundColor: backgroundColor
     * From the state variable tasks which needs to be sorted by date first.
      * @param tasksSortedByCreationDate {[]} array of task objects as saved to SQLite sorted by creationDate (later dueDate!!)
     * @returns {*[]}
     */
    const createNextTasksArray = (tasksSortedByCreationDate) => {
        let nextTasks = [];
        tasksSortedByCreationDate.filter(t => !t.isDone).forEach(t => {
            nextTasks.push({
                id: t.taskId,
                name: t.taskTitle,
                daysLeft: "",
                backgroundColor: COLOR.ICONCOLOR_CUSTOM_BLUE
            })
        });
        return nextTasks;
    }



    // Dummy-Tasks
    const dummyTasks = [
        { id: 1, name: 'Aufgabe 1', daysLeft: 8, backgroundColor: COLOR.ICONCOLOR_CUSTOM_BLUE },
        { id: 2, name: 'Aufgabe 2', daysLeft: 15, backgroundColor: COLOR.ICONCOLOR_CUSTOM_BLUE },
        { id: 3, name: 'Aufgabe 3', daysLeft: 20, backgroundColor: COLOR.ICONCOLOR_CUSTOM_BLUE },
        { id: 4, name: 'Aufgabe 4', daysLeft: 30, backgroundColor: COLOR.ICONCOLOR_CUSTOM_BLUE },
    ];

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[randomIndex];
    }

    //Screen-Höhen
    //844 iPhone 12 Pro
    //667 iPhone SE
    //932 iPhone 12 Pro MAX
    const getNextTasksCount = () => {
        const screenHeight = windowHeight;
        //console.log("Screen Höhe:",screenHeight);
        if(screenHeight < 700){
            return 1;
        } else if (screenHeight < 900) {
            return 2;
        } else  {
            return 3;
        }
    }

    const nextTasksCount = getNextTasksCount();

    //change the profil image and safe it to asyncStorage
    const handlePressImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            await saveProfileImage(result.assets[0].uri);
        } else {
            console.log('Es wurde kein Bild ausgewählt.');
        }
    };

    // Load the lists immediately when the page is first displayed or when isDbReady changes
    useEffect(() => {
        async function fetchData() {
            if (isDbReady) {
                loadLists();
            }
            const loadedImageUri = await loadProfileImage(); // from asyncStorage.js
            setSelectedImage(loadedImageUri);
            setQuote(getRandomQuote);
        }
        fetchData();
    }, [isDbReady]);

    useEffect(() => {
        const getWeather = async () => {
            if (locationName) {
                const data = await fetchCurrentWeather(locationName);
                setWeatherData(data);
            }
        };
        getWeather();
    }, [locationName]);

    useEffect(() => {
        if (icalData) {
            const filteredAndSorted = filterAndSortCourses(icalData);
            //setNextCourses(filteredAndSorted.slice(0, 2)); // Speichere nur die nächsten zwei Kurse
            setNextCourses(filteredAndSorted); // Speichere alle nächsten
        }
    }, [icalData]);

    // If the database is still loading, show the loading indicator
    if (!isDbReady) {
        return (
            <LoadingComponent message={"Laden..."}/>
        );
    }

    return (
        <View style={{flex: 1, backgroundColor: isDarkMode ? DARKMODE.BACKGROUNDCOLOR : LIGHTMODE.BACKGROUNDCOLOR}}>
            {/*Drawer Header*/}
            <View style={{zIndex: 1}}>
                <CustomDrawerHeader onPress={() => navigation.openDrawer()}/>
            </View>

            <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                {/*Greeting und Image*/}
                <View>
                    {/* ImageViewer mit TouchableOpacity für den Kamerabutton */}
                    <TouchableOpacity onPress={handlePressImage} style={{zIndex: 2}}>
                        <View style={styles.imageContainer}>
                            <ImageViewer
                                placeholderImageSource={require("../../assets/images/avataaars.png")}
                                selectedImage={selectedImage}
                                styles={styles.imageViewer}
                            />
                            <View style={styles.cameraStyle}>
                                <Icon name={ICONS.CAMERA.INACTIVE} size={35}
                                      color={isDarkMode ? COLOR.BUTTONLABEL : COLOR.ICONCOLOR_CUSTOM_BLACK}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Guten Tag, Max Mustermann*/}
                    <Greeting name={userData?.firstname}/>
                    {/* Spacing */}
                    <View style={styles.spacing}></View>
                </View>

                {/*Container Boxen*/}
                <View style={styles.contentContainer}>
                    {/*Box 1*/}
                    <View style={styles.informationContainer}>
                        <View style={isDarkMode ? styles.dateTimeWeatherBoxDark : styles.dateTimeWeatherBoxLight}>
                            <Text
                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textDateName]}>{getDay(day) + ", " + date + "." + month}</Text>
                            <View style={styles.temperature}>
                                <Text
                                    style={[isDarkMode ? styles.textDark : styles.textLight, styles.textTemperature]}>{weatherData.temperature}</Text>
                                <Text
                                    style={[isDarkMode ? styles.textDark : styles.textLight, styles.textTemperatureSymbol]}>°</Text>
                            </View>
                            <Icon name={weatherData.icon} size={100}
                                  color={isDarkMode ? DARKMODE.BACKGROUNDCOLOR : LIGHTMODE.BACKGROUNDCOLOR}/>
                        </View>
                        <View style={isDarkMode ? styles.motivationalQuoteBoxDark : styles.motivationalQuoteBoxLight}>
                            <Text
                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.motivationalQuoteText]}>{quote}</Text>
                        </View>
                    </View>

                    {/*Box 2, Nächste Kurse*/}
                    <View>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                            Kurse</Text>
                        <View style={styles.coursesSection}>
                            <ScrollView horizontal={true} style={styles.coursesContainer} showsHorizontalScrollIndicator={false}>
                            {nextCourses.map((course) => {
                                // Extrahiere die Kursnummer aus der URL
                                const crsMatch = course.url?.value.match(/crs_(\d+)/);
                                const crsNummer = crsMatch ? crsMatch[1] : 'Unbekannt';
                                // Hole den anzuzeigenden Kursnamen basierend auf der crsNummer
                                const displayName = getCourseNameByNumber(crsNummer);

                                return (
                                    <NextCourseBox
                                        key={course.uid.value}
                                        headerTitle={displayName} // Verwende den Namen aus getCourseNameByNumber
                                        headerBackgroundColor={COLOR.ICONCOLOR_CUSTOM_BLUE}
                                        date={new Date(course.dtstart.value).toLocaleDateString("de-AT", {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        timeStart={formatLocalTime(course.dtstart.value)}
                                        timeEnd={formatLocalTime(course.dtend.value)}
                                        containerStyle={[styles.nextCourseBox]}
                                    />
                                );
                            })}
                            </ScrollView>
                        </View>
                    </View>

                    {/*Box 3, Nächste Aufgaben*/}
                    <View>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                            Aufgaben</Text>

                            {nextTasks.slice(0, nextTasksCount).map((task)=>(
                                <View style={styles.taskRow}
                                      key={task.id}
                                >
                                <NextTaskButton
                                    buttonTextLeft={task.name}
                                    //buttonTextRight={`in ${task.daysLeft} Tagen`}
                                    boxBackgroundColor={task.backgroundColor}
                                />
                                </View>
                            ))}
                    </View>
                </View>

            </View>
        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        flexDirection: "column",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        flexDirection: "column",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    informationContainer: {
        flexDirection: "row",
        //minHeight: 100,
        marginTop: 10,
    },
    dateTimeWeatherBoxLight: {
        flex: 1, // 1/3
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    dateTimeWeatherBoxDark: {
        flex: 1, // 1/3
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    motivationalQuoteBoxLight: {
        flex: 2, // 2/3
        backgroundColor: LIGHTMODE.BOX_COLOR,
        marginLeft: 15,
        borderRadius: SIZES.BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    motivationalQuoteBoxDark: {
        flex: 2, // 2/3
        backgroundColor: DARKMODE.BOX_COLOR,
        marginLeft: 15,
        borderRadius: SIZES.BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    motivationalQuoteText: {
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
    },
    temperature: {
        position: "absolute",
        zIndex: 1,
        bottom: 0,
        left: 10,
        flexDirection: "row"
    },
    textTemperature: {
        fontSize: SIZES.SCREEN_TEXT_LARGE,
        fontWeight: "200",
    },
    textTemperatureSymbol: {
        fontSize: SIZES.SCREEN_TEXT_SMALL + 22,
        fontWeight: "200",
    },
    textDateName: {
        fontSize: SIZES.SCREEN_TEXT_SMALL,
        position: "absolute",
        zIndex: 1,
        top: 10,
        left: 10,
    },
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        paddingVertical: SIZES.SPACING_HORIZONTAL_SMALL
    },
    headerName: {
        fontSize: SIZES.SCREEN_HEADER + 10,
        fontWeight: "300",
        //paddingLeft: 20
    },
    coursesContainer: {
        flexDirection: 'row',
        //justifyContent: "space-between",
    },
    nextCourseBox: {
        //flexBasis: "48%",
        //width: 170,
        marginRight: 15
    },
    greetingContainer: {
        height: 90,
        justifyContent: "flex-end",
    },
    greetings: {
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        marginBottom: 0,
    },
    imageContainer: {
        position: "relative",
        flex: 1,
        alignItems: "flex-end",
        top: -40,
    },
    imageViewer: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    cameraStyle: {
        position: "relative",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        top: 5,
    },
    taskRow: {
        marginBottom: 15
    },
    // Spacing between elements
    spacing: {
        marginVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
})