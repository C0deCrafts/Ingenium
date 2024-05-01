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
import {useCalendar} from "../../context/CalendarContext";
import {getDay, formatLocalTime, filterAndSortCourses} from "../../utils/utils";
import Greeting from "../../components/Greeting";
import SquareIcon from "../../components/SquareIcon";
import {useSafeAreaInsets} from "react-native-safe-area-context";

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

    const { iCalData, getCourseNameByNumber } = useCalendar();
    const [nextCourses, setNextCourses] = useState([]);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [nextTasks, setNextTasks] = useState([]);

    const {tasks, lists} = useDatabase();

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

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

    const createNextTasksArray = (tasksSortedByCreationDate) => {
        let nextTasks = [];
        tasksSortedByCreationDate.filter(t => !t.isDone).forEach(t => {
            const list = lists.find(l => l.listId === t.listId);
            if (list) {
                nextTasks.push({
                    id: t.taskId,
                    name: t.taskTitle,
                    listId: t.listId, // Ensure listId is included here
                    listIcon: list?.iconName,
                    iconBackgroundColor: list?.iconBackgroundColor,
                    backgroundColor: COLOR.ICONCOLOR_CUSTOM_BLUE
                });
            }
        });
        return nextTasks;
    }

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
                        {isLoadingCourses ? (
                            <View style={styles.nextCourseContainer}>
                                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                                    Kurse</Text>
                                <View style={isDarkMode ? styles.emptyContainerCourseDark : styles.emptyContainerCourseLight}>
                                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.emptyContainerText]}>Kurse werden geladen...</Text>
                                </View>
                            </View>
                        ) : nextCourses.length === 0 ? (
                                <View style={styles.nextCourseContainer}>
                                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                                        Kurse</Text>
                            <View style={isDarkMode ? styles.emptyContainerCourseDark : styles.emptyContainerCourseLight}>
                                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.emptyContainerText]}>Keine nächsten Kurse</Text>
                            </View>
                                </View>
                        ) : (
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
                        )}


                    {/*Box 3, Nächste Aufgaben*/}
                    <View style={styles.nextTaskContainer}>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                            Aufgaben</Text>
                        {nextTasks.length === 0 ? (
                            <View style={isDarkMode ? styles.emptyContainerDark : styles.emptyContainerLight}>
                                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.emptyContainerText]}>Keine nächsten Aufgaben</Text>
                            </View>
                        ) : (
                            nextTasks.slice(0, nextTasksCount).map((task)=>(
                                <View style={styles.taskRow}
                                      key={task.id}
                                >
                                    <NextTaskButton
                                        buttonTextLeft={task.name}
                                        //buttonTextRight={`in ${task.daysLeft} Tagen fällig`}
                                        //überfällig wenn zu lange (in ROT)
                                        boxBackgroundColor={task.backgroundColor}
                                        leftComponent={()=> (
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

function getStyles(insets){

    return StyleSheet.create({
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
    nextTaskContainer:{
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
}