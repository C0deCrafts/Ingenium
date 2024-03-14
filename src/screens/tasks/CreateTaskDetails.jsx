import {Text, View, StyleSheet} from "react-native";
import {useTheme} from "../../context/ThemeContext";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";

function CreateTaskDetails({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    const handleGoBack = () => {
        navigation.goBack(); // goBack() aufrufen, wenn der Button gedrückt wird
    };

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            {/* Custom back button with title*/}
            <CustomBackButton
                onPress={handleGoBack}
                showTitle={true}
                title={"Details"}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                    Datum
                </Text>
                <View style={styles.spacing}></View>
                <View style={isDarkMode ? styles.calendarBoxDark : styles.calendarBoxLight}>
                    <Text style={isDarkMode ? styles.textDark : styles.textLight}>Kalender</Text>
                </View>
                <View style={styles.spacing}></View>
                <View style={isDarkMode ? styles.boxDark : styles.boxLight}>
                    <Text style={isDarkMode ? styles.textDarkFeatures : styles.textLightFeatures}>
                        In der Version 2 unserer App werden folgende Features enthalten sein:
                        Möglichkeit, Aufgaben direkt im Kalender zu speichern.
                        Benachrichtigungen, die Sie daran erinnern, bevor eine Aufgabe fällig ist.
                        Option, Bilder mit Ihren Aufgaben zu verknüpfen und zu speichern.
                        Möglichkeit, URLs als Teil einer Aufgabe zu speichern.
                        Funktion zum Teilen von Aufgaben mit anderen Nutzern.
                    </Text>
                </View>
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
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    // Content styles for light and dark mode
    contentLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER,
        paddingBottom: insets.bottom + 10
    },
    contentDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER,
        paddingBottom: insets.bottom + 10
    },
    // Header text styles
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
    },
    // Text styles for light and dark mode
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textLightFeatures: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
        textAlign: "justify",
        padding: 10
    },
    textDarkFeatures: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
        textAlign: "justify",
        padding: 10
    },
    // Spacing between elements
    spacing: {
        marginVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
    calendarBoxLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        height: 200, //platzhalter
        alignItems: "center", //platzhalter
        justifyContent: "center" //platzhalter
    },
    calendarBoxDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        height: 200, //platzhalter
        alignItems: "center", //platzhalter
        justifyContent: "center" //platzhalter
    },
    boxLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        alignItems: "center", //platzhalter
        justifyContent: "center" //platzhalter
    },
    boxDark: {
        flex: 1,
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        alignItems: "center", //platzhalter
        justifyContent: "center" //platzhalter
    }
})}