import {Text, View, StyleSheet} from "react-native";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {navigationRef} from "../../navigation/context/NavContext";

function Inbox(){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const handleGoBack = () => {
        console.log("Navigation goBack wurde in der Inbox aufgerufen")

        navigationRef.reset({
            index: 0,
            routes: [{ name: 'Task_Tab', params: { screen: 'Task_Stack' } }],
        });
    }

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButton
                onPress={handleGoBack}
                showTitle={true}
                title={"Inbox"}
            />
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Inbox</Text>
            </View>
        </View>
    )
}

export default Inbox;

const styles = StyleSheet.create({
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
    contentLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
    }
})