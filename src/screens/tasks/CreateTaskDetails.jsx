import {Text, View, StyleSheet, Alert, ScrollView} from "react-native";
import {useTheme} from "../../context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomCalendar from "../../components/CustomCalendar";
import CustomBoxButton from "../../components/buttons/CustomBoxButton";
import {ICONS} from "../../constants/icons";
import {useTask} from "../../context/TaskContext";

function CreateTaskDetails({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    //taskDetails evtl. für calenderpicker anzeige des tags dueDate wenn vorhanden
    const { taskDetails, updateTaskDetails } = useTask();

    const handleGoBack = async () => {
        navigation.goBack();
    };

    // Funktion, um das Datum vom Kalender zu empfangen
    const handleSelectedDate = (date) => {
        updateTaskDetails({
            dueDate: date
        })
        console.log("Empfangenes Datum: ", date);
    };

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            {/* Custom back button with title*/}
            <CustomBackButton
                onPress={handleGoBack}
                showTitle={true}
                title={"Details"}/>
            <View style={styles.content}>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                    Fällig am
                </Text>
                <View style={styles.calendarBox}>
                   <CustomCalendar onDayPress={handleSelectedDate}/>
                </View>
                <ScrollView style={styles.buttonContainer}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                >
                    <View style={styles.box}>
                        <CustomBoxButton
                            buttonTextLeft={" Erinnern"}
                            iconBoxBackgroundColor={COLOR.BUTTONCOLOR}
                            iconColor={COLOR.BUTTONLABEL}
                            iconName={ICONS.NOTIFICATION.INACTIVE}
                            extraPadding={5}
                            showForwardIcon={false}
                            onPress={() => Alert.alert("In Version 2 verfügbar!")}
                        />
                    </View>
                    <View style={styles.box}>
                        <CustomBoxButton
                            buttonTextLeft={" Bild hinzufügen"}
                            iconName={ICONS.TASKICONS.ADD}
                            iconColor={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                            extraPadding={5}
                            showForwardIcon={false}
                            onPress={() => Alert.alert(" In Version 2 verfügbar!")}
                        />
                    </View>
                    <View style={styles.box}>
                        <CustomBoxButton
                            buttonTextLeft={" Aufgabe teilen"}
                            iconBoxBackgroundColor={COLOR.BUTTONCOLOR}
                            iconColor={COLOR.BUTTONLABEL}
                            iconName={ICONS.EXPORT.INACTIVE}
                            extraPadding={5}
                            showForwardIcon={false}
                            onPress={() => Alert.alert(" In Version 2 verfügbar!")}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default CreateTaskDetails;

function getStyles(insets){
return StyleSheet.create({
    // Container styles for light and dark mode
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    content: {
        flex: 1,
        flexDirection: "column",
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER - 10,
        paddingBottom: insets.bottom + 10,
    },
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    spacing: {
        marginBottom: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
    calendarBox: {
        marginTop: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
        marginBottom: SIZES.SPACES_VERTICAL_BETWEEN_BOXES * 2,
    },
    buttonContainer: {
        flex: 1,
    },
    box: {
        marginBottom: SIZES.SPACES_VERTICAL_BETWEEN_BOXES
    },
})}