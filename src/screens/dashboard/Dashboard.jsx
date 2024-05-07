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
import NextTaskBox from "../../components/boxes/NextTaskBox";
import NextCourseBox from "../../components/boxes/NextCourseBox";
import {loadProfileImage, saveProfileImage} from "../../storages/asyncStorage";
import {motivationalQuotes} from "../../constants/motivationalQuotes";
import {useLocation} from "../../context/LocationContext";
import fetchCurrentWeather from '../../api/weather';
import {useAuth} from "../../context/AuthContext";
import {useCalendar} from "../../context/CalendarContext";
import {
    getDay,
    formatLocalTime,
    filterAndSortCourses,
    sortTasksByDueDate,
    getDueDateStatus
} from "../../utils/utils";
import Greeting from "../../components/Greeting";
import SquareIcon from "../../components/SquareIcon";

/**
 * ### Dashboard Component
 *
 * The Dashboard is the main screen of the app where users can see their profile,
 * upcoming courses, tasks, weather updates, and inspirational quotes. It changes
 * appearance based on whether the user prefers a dark or light theme.
 * Additionally, the user is greeted individually based on the time of day,
 * and the current date is displayed.
 *
 * #### Features:
 * - **Theme Adjustment**: Uses the `useTheme` hook to check if the theme is dark or light and changes
 *   the display to match.
 * - **Managing Data**: Keeps track of various pieces of information like the profile picture,
 *   weather, quotes, and updates the list of tasks and courses as needed.
 * - **Getting External Data**: Retrieves weather conditions using an external API and
 *   fetches user-specific data like name, courses and tasks from the backend.
 * - **Updating Profile Image**: Users can change their profile picture by picking a new image from their
 *   device.
 * - **Displaying Content Dynamically**: Randomly shows different motivational quotes and lists upcoming
 *   courses and tasks, which adjusts based on the size of the screen for a tailored look.
 *
 * #### Layout:
 * 1. **Main View Container**: Sets up the background color and layout according to the theme,
 *    filling the whole screen.
 * 2. **Header with Navigation Drawer**: Includes a button that lets users open the navigation menu.
 * 3. **Profile Section**:
 *    - **Image Viewer with Touch Interaction**: Shows the profile picture and lets users tap to change it.
 *    - **Personal Greeting**: Displays a welcome message that changes based on the user’s name and the time.
 * 4. **Sections for Displaying Information**:
 *    - **Weather and Date Display**: Provides current weather details and the date.
 *    - **Quote Box**: Displays one of the preset motivational quotes at random.
 *    - **Overview of Courses and Tasks**: Lists tasks and courses coming up soon.
 *
 * #### Elements:
 * - **CustomDrawerHeader**: A button that opens the side menu.
 * - **ImageViewer**: Shows the current profile image or a default image if none is set.
 * - **Icon**: Used in different places, like the camera icon for updating the profile image and icons for the weather.
 * - **Greeting**: A text element that shows customized greetings.
 * - **NextTaskBox and NextCourseBox**: Special components that display the next tasks and courses.
 * - **ScrollView**: Enables horizontal scrolling in the courses section to manage extra content in a user-friendly way.
 *
 * Each part of the Dashboard is designed to make user interactions easy and effective by organizing
 * information in a clear, visually appealing way. It ensures a seamless and adaptive user experience
 * tailored to individual needs and preferences.
 */
function Dashboard({navigation}) {
    // Theme context to switch between dark and light mode.
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    // Database context for managing data
    const {isDbReady, loadLists, tasks, lists} = useDatabase();

    // Fetches and sets weather data based on the user's location.
    const locationName = useLocation();
    const {iCalData, getCourseNameByNumber} = useCalendar();

    // Load an object userData from the backend (in this case for displaying the user's name)
    const {userData} = useAuth();

    // State variables
    const [quote, setQuote] = useState("");
    const [nextCourses, setNextCourses] = useState([]);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [nextTasks, setNextTasks] = useState([]);
    const [weatherData, setWeatherData] = useState({condition: '', icon: ICONS.WEATHER_ICONS.DEFAULT});
    const [selectedImage, setSelectedImage] = useState(null);

    // Effect hook to load tasks when database is ready
    useEffect(() => {
        async function fetchData() {
            if (isDbReady) {
                loadLists(); // Load lists from the database
            }
            const loadedImageUri = await loadProfileImage(); // Load profile image from asyncStorage.js
            setSelectedImage(loadedImageUri);
            setQuote(getRandomQuote); // Set a random motivational quote
        }

        fetchData();
    }, [isDbReady]);

    // Effect hook to fetch weather data based on location
    useEffect(() => {
        const getWeather = async () => {
            if (locationName) {
                const data = await fetchCurrentWeather(locationName);
                setWeatherData(data);
            }
        };
        getWeather();
    }, [locationName]);

    // Effect hook to process calendar data
    useEffect(() => {
        if (iCalData) {
            try {
                const filteredAndSorted = filterAndSortCourses(iCalData);
                setNextCourses(filteredAndSorted); // Speichere alle nächsten Kurse
                setIsLoadingCourses(false);
            } catch (error) {
                console.error("Fehler beim Laden der Kursdaten", error);
                setIsLoadingCourses(false);
            }
        }
    }, [iCalData]);

    const date = new Date().getDate().toString().padStart(2, '0');
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const day = new Date().getDay();

    //Function to handle selecting a profile image and safe it to asyncStorage
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

    // Function to get a random motivational quote
    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[randomIndex];
    }

    /*Function to determine the number of next tasks to display based on screen height
    Default screen height - iPhone:
    Height: 844 -> iPhone 12 Pro
    Height: 667 -> iPhone SE
    Height: 932 -> iPhone 12 Pro MAX*/
    const getNextTasksCount = () => {
        const screenHeight = windowHeight;
        //console.log("Screen Höhe:",screenHeight);
        if (screenHeight < 700) {
            return 1;
        } else if (screenHeight < 900) {
            return 2;
        } else {
            return 3;
        }
    }
    const nextTasksCount = getNextTasksCount();

    // Function to sort an array of next tasks by creation date
    const tasksSortedByCreationDate = tasks.sort((a, b) => {
        const dateA = new Date(a.creationDate);
        const dateB = new Date(b.creationDate);
        return dateA - dateB;
    });

    // Function to create an array of next tasks
    const createNextTasksArray = (tasksSortedByCreationDate) => {
        let nextTasks = [];
        const sortedTasksByDueDate = sortTasksByDueDate(tasksSortedByCreationDate); // Sort tasks by due date
        sortedTasksByDueDate.filter(t => !t.isDone).forEach(t => {
            const list = lists.find(l => l.listId === t.listId);
            if (list) {
                nextTasks.push({
                    id: t.taskId,
                    name: t.taskTitle,
                    listId: t.listId, // Ensure listId is included here
                    listIcon: list?.iconName,
                    dueDate: t.dueDate,
                    iconBackgroundColor: list?.iconBackgroundColor,
                    backgroundColor: COLOR.ICONCOLOR_CUSTOM_BLUE
                });
            }
        });
        return nextTasks;
    }

    // Sort tasks by creation date and update next tasks when tasks change
    useEffect(() => {
        let nextTasks = createNextTasksArray(tasksSortedByCreationDate);
        setNextTasks(nextTasks);
    }, [tasks]);


    return (
        <View style={{flex: 1, backgroundColor: isDarkMode ? DARKMODE.BACKGROUNDCOLOR : LIGHTMODE.BACKGROUNDCOLOR}}>
            {/*Drawer Header*/}
            <View style={{zIndex: 1}}>
                <CustomDrawerHeader onPress={() => navigation.openDrawer()}/>
            </View>

            <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                {/*Greeting und Image*/}
                <View>
                    {/* ImageViewer with TouchableOpacity for the camera button */}
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

                {/*Container Boxes*/}
                <View style={styles.contentContainer}>
                    {/*Box 1*/}
                    <View style={styles.informationContainer}>
                        <View style={isDarkMode ? styles.dateTimeWeatherBoxDark : styles.dateTimeWeatherBoxLight}>
                            <Text
                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textDateName]}>{getDay(day) + ", " + date + "." + month}</Text>
                            {weatherData.temperature && (
                                    <View style={styles.temperature}>
                                        <Text
                                            style={[isDarkMode ? styles.textDark : styles.textLight, styles.textTemperature]}>{weatherData.temperature}</Text>
                                        <Text
                                            style={[isDarkMode ? styles.textDark : styles.textLight, styles.textTemperatureSymbol]}>°</Text>
                                    </View>
                            )}
                            <Icon name={weatherData.icon} size={100}
                                  color={isDarkMode ? DARKMODE.BACKGROUNDCOLOR : LIGHTMODE.BACKGROUNDCOLOR}/>
                        </View>
                        <View style={isDarkMode ? styles.motivationalQuoteBoxDark : styles.motivationalQuoteBoxLight}>
                            <Text
                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.motivationalQuoteText]}>{quote}</Text>
                        </View>
                    </View>

                    {/*Box 2, Next courses*/}
                    {isLoadingCourses ? (
                        <View style={styles.nextCourseContainer}>
                            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                                Kurse</Text>
                            <View
                                style={isDarkMode ? styles.emptyContainerCourseDark : styles.emptyContainerCourseLight}>
                                <Text
                                    style={[isDarkMode ? styles.textDark : styles.textLight, styles.emptyContainerText]}>Kurse
                                    werden geladen...</Text>
                            </View>
                        </View>
                    ) : nextCourses.length === 0 ? (
                        <View style={styles.nextCourseContainer}>
                            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                                Kurse</Text>
                            <View
                                style={isDarkMode ? styles.emptyContainerCourseDark : styles.emptyContainerCourseLight}>
                                <Text
                                    style={[isDarkMode ? styles.textDark : styles.textLight, styles.emptyContainerText]}>Keine
                                    nächsten Kurse</Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                                Kurse</Text>
                            <View>
                                <ScrollView horizontal={true} style={styles.coursesContainer}
                                            showsHorizontalScrollIndicator={false}>
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
                    )}

                    {/*Box 3, Next tasks*/}
                    <View style={styles.nextTaskContainer}>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                            Aufgaben</Text>
                        {nextTasks.length === 0 ? (
                            <View style={isDarkMode ? styles.emptyContainerDark : styles.emptyContainerLight}>
                                <Text
                                    style={[isDarkMode ? styles.textDark : styles.textLight, styles.emptyContainerText]}>Keine
                                    nächsten Aufgaben</Text>
                            </View>
                        ) : (
                            nextTasks.slice(0, nextTasksCount).map((task) => (
                                <View style={styles.taskRow}
                                      key={task.id}
                                >
                                    <NextTaskBox
                                        buttonTextLeft={task.name}
                                        buttonTextRight={getDueDateStatus(task.dueDate)}
                                        //überfällig wenn zu lange (in ROT)
                                        boxBackgroundColor={task.backgroundColor}
                                        leftComponent={() => (
                                            <SquareIcon name={task.listIcon}
                                                        backgroundColor={task.iconBackgroundColor}
                                                        isUserIcon={true}
                                                        size={60}
                                                        customIconSize={35}
                                            />
                                        )}
                                    />
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Dashboard;

const styles =  StyleSheet.create({
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
            paddingVertical: SIZES.SPACING_HORIZONTAL_DEFAULT - 5
        },
        headerName: {
            fontSize: SIZES.SCREEN_HEADER + 10,
            fontWeight: "300",
            //paddingLeft: 20
        },
        coursesContainer: {
            flexDirection: 'row',
        },
        nextCourseBox: {
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
        nextTaskContainer: {
            flex: 1,
        },
        nextCourseContainer: {
            flex: 1,
        },
        emptyContainerLight: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: LIGHTMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
            marginBottom: 10
        },
        emptyContainerDark: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: DARKMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
            marginBottom: 10
        },
        emptyContainerCourseLight: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: LIGHTMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
            marginBottom: 10
        },
        emptyContainerCourseDark: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: DARKMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
            marginBottom: 10
        },
        emptyContainerText: {
            fontSize: SIZES.TEXT_SIZE
        }
})