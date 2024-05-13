import {Text, View, StyleSheet, Image, ScrollView} from "react-native";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {navigationRef} from "../../context/NavContext";
import {useAuth} from "../../context/AuthContext";

function Inbox(){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;
    const {userData} = useAuth();

    const handleGoBack = () => {
        //console.log("Navigation goBack wurde in der Inbox aufgerufen")
        navigationRef.reset({
            index: 0,
            routes: [{ name: 'Task_Tab', params: { screen: 'Task_Stack' } }],
        });
    }

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButton
                onPress={handleGoBack}
                showTitle={true}
                title={"Inbox"}
            />
            <ScrollView
                style={isDarkMode ? styles.contentDark : styles.contentLight}
                contentContainerStyle={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <Image source={require("../../assets/images/inbox_image.png")}
                       style={styles.image}
                       resizeMode={"contain"}
                />

                <View style={styles.flexGrow}>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Hallo {userData?.firstname}!</Text>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textSizeNormal]}>
                        Die Inbox ist dein persönlicher Assistent, der dir hilft, organisiert zu bleiben und erfolgreich voranzukommen.
                    </Text>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textSizeNormal]}>
                        In der Inbox werden alle bedeutenden Aktualisierungen und Benachrichtigungen zu Aufgaben und Projekten gesammelt.
                    </Text>
                </View>
            </ScrollView>
            <View style={isDarkMode ? styles.infoContainerDark : styles.infoContainerLight}>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textInfo]}>
                    Aktuell befinden sich keine neuen Aktualisierungen oder Benachrichtigungen in deiner Inbox.
                </Text>
            </View>
            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNote]}>
                Hinweis: dieses Feature ist erst ab V2 verfügbar!
            </Text>
        </View>
    )
}

export default Inbox;

const styles = StyleSheet.create({
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
    contentLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER,
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT - 10,
    },
    contentDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER,
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT - 10,
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: "center",
    },
    flexGrow: {
        flex: 1,
        justifyContent: "center"
    },
    infoContainerLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        paddingVertical: SIZES.SPACING_VERTICAL_DEFAULT
    },
    infoContainerDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        paddingVertical: SIZES.SPACING_VERTICAL_DEFAULT
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
    },
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        marginBottom: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
        textAlign: "center",
    },
    textSizeNormal: {
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
        textAlign: "left",
        marginBottom: 20
    },
    textInfo: {
        fontSize: SIZES.SCREEN_TEXT_XS,
        fontStyle: "italic",
        textAlign: "center",
    },
    textNote: {
        fontSize: SIZES.SCREEN_TEXT_SMALL,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        textAlign: "center",
        color: "red",
        marginTop: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
        marginBottom: 50
    },
    image: {
        width: "70%",
        height: 200,
        marginVertical: SIZES.SPACING_VERTICAL_SMALL,
    },
});