import {Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {useDatabase} from "../../context/DatabaseContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import ImageViewer from "../../components/ImageViewer";
import {USER_COLORS, USER_ICONS} from "../../constants/customizationSettings";
import CustomInputField from "../../components/inputFields/CustomInputField";
import CustomBoxButton from "../../components/buttons/CustomBoxButton";
import NextTaskButton from "../../components/buttons/NextTaskButton";
import NextCourseBox from "../../components/buttons/NextCourseBox";

function Dashboard({navigation}) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {tasks, isDbReady, lists, loadLists} = useDatabase();
    const [selectedImage, setSelectedImage] = useState(null);

    const handlePressImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            //aspect: [4,3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            console.log(result);
        } else {
            alert('You did not select any image.');
        }
    };

    // Lade die Listen sofort, wenn die Seite zum ersten Mal angezeigt wird
    // oder wenn sich isDbReady ändert
    useEffect(() => {
        if (isDbReady) {
            loadLists();
            console.log("The Tasks State - Dashboard", JSON.stringify(tasks, null, 2));
        }
    }, [isDbReady]);

    if (!isDbReady) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>

            <View style={{zIndex: 1}}>
                <CustomDrawerHeader onPress={() => navigation.openDrawer()}/>
            </View>
            {/*oberer Teil ohne Scroll VIEW*/}
            <View style={styles.firstContent}>
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
                                  color={isDarkMode ? COLOR.BUTTONCOLOR : COLOR.ICONCOLOR_CUSTOM_BLACK}/>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Guten Tag, Max Mustermann - 1. BOX*/}
                <View style={styles.greetingContainer}>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.greetings]}>Guten Tag,</Text>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.headerName]}>Maximilian</Text>
                </View>
                {/* Spacing */}
                <View style={styles.spacing}></View>
                {/*2. BOX*/}
                <View style={styles.informationContainer}>
                    <View style={isDarkMode ? styles.dateTimeWeatherBoxDark : styles.dateTimeWeatherBoxLight}>
                        <Text
                            style={[isDarkMode ? styles.textDark : styles.textLight, styles.textDateName]}>Sonntag</Text>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textDate]}>31</Text>
                        <Icon name={ICONS.WEATHER_ICONS.SUNNY} size={100}
                              color={isDarkMode ? DARKMODE.BACKGROUNDCOLOR : LIGHTMODE.BACKGROUNDCOLOR}/>
                    </View>
                    <View style={isDarkMode ? styles.motivationalQuoteBoxDark : styles.motivationalQuoteBoxLight}>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.motivationalQuoteText]}>Zeit,
                            die Dinge in Angriff zu nehmen!</Text>
                    </View>
                </View>

                {/* Spacing */}
                <View style={styles.spacing}></View>
                <View style={styles.nextCoursesContainer}>
                    {/* Nächste Kurse - 3. BOX*/}
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste Kurse</Text>
                    <View style={styles.coursesContainer}>
                        <View style={isDarkMode ? styles.courseBoxOneDark : styles.courseBoxOneLight}>
                            <NextCourseBox
                                headerTitle={"Programmieren"}
                                headerBackgroundColor={COLOR.ICONCOLOR_CUSTOM_BLUE}
                                date={"Montag, 08. Jänner"}
                                timeStart={"17:00"}
                                timeEnd={"19:25"}
                            />
                        </View>
                        <View style={isDarkMode ? styles.courseBoxTwoDark : styles.courseBoxTwoLight}>
                            <NextCourseBox
                                headerTitle={"Web"}
                                headerBackgroundColor={COLOR.ICONCOLOR_CUSTOM_PINK}
                                date={"Montag, 08. Jänner"}
                                timeStart={"19:30"}
                                timeEnd={"21:00"}
                            />
                        </View>
                    </View>
                    <View style={styles.spacing}></View>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Nächste
                        Aufgaben</Text>
                </View>
            </View>


                <ScrollView contentContainerStyle={{flexGrow: 1, paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT}}>
                    {/* Nächste Aufgaben - 4.BOX*/}
                        <View style={styles.taskRow}>
                            <NextTaskButton
                                buttonTextLeft={"WMC TEST"}
                                buttonTextRight={"in 8 Tagen"}
                                boxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_PINK}
                            />
                        </View>
                        <View style={styles.taskRow}>
                            <NextTaskButton
                                buttonTextLeft={"NSCS TEST"}
                                buttonTextRight={"in 15 Tagen"}
                                boxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_AQUA}
                            />
                        </View>
                        {/* Spacing */}
                        <View style={styles.spacing}></View>
                </ScrollView>

        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        flexDirection: "column",
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        flexDirection: "column",
    },
    firstContent: {
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    secondContent: {
        flexGrow: 1,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    greetingContainer: {
        height: 90,
        justifyContent: "flex-end",
    },
    nextCoursesContainer: {
        height: 220
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
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        paddingBottom: SIZES.SPACING_HORIZONTAL_SMALL
    },
    headerName: {
        fontSize: SIZES.SCREEN_HEADER + 10,
        fontWeight: "300",
        paddingLeft: 20
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
    },
    section: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    informationContainer: {
        flexDirection: "row",
        height: 100,
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
    textDate: {
        fontSize: SIZES.SCREEN_TEXT_LARGE,
        fontWeight: "200",
        position: "absolute",
        zIndex: 1,
        bottom: SIZES.SPACING_VERTICAL_SMALL,
        left: SIZES.SPACING_HORIZONTAL_SMALL,
    },
    textDateName: {
        fontSize: SIZES.SCREEN_TEXT_SMALL,
        position: "absolute",
        zIndex: 1,
        top: SIZES.SPACING_VERTICAL_SMALL,
        left: SIZES.SPACING_HORIZONTAL_SMALL,
    },
    motivationalQuoteBoxLight: {
        flex: 2, // 2/3
        backgroundColor: LIGHTMODE.BOX_COLOR,
        marginLeft: 15,
        borderRadius: SIZES.BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        paddingVertical: SIZES.SPACING_VERTICAL_DEFAULT,
    },
    motivationalQuoteBoxDark: {
        flex: 2, // 2/3
        backgroundColor: DARKMODE.BOX_COLOR,
        marginLeft: 15,
        borderRadius: SIZES.BORDER_RADIUS,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        paddingVertical: SIZES.SPACING_VERTICAL_DEFAULT,
    },
    motivationalQuoteText: {
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    coursesContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: SIZES.SPACING_VERTICAL_SMALL
    },
    courseBoxOneLight: {
        flex: 1, // 1/3
    },
    courseBoxOneDark: {
        flex: 1, // 1/3
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS
    },
    courseBoxTwoLight: {
        flex: 1, // 1/3
        marginLeft: 15,
    },
    courseBoxTwoDark: {
        flex: 1, // 1/3
        backgroundColor: DARKMODE.BOX_COLOR,
        marginLeft: 15,
        borderRadius: SIZES.BORDER_RADIUS
    },
    taskRow: {
        marginBottom: 15
    },
    // Spacing between elements
    spacing: {
        marginVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
})