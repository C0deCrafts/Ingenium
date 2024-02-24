import {Text, View, StyleSheet, Switch} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";

function Settings({navigation}){
    const { theme, toggleTheme } = useTheme(); // Verwende den useTheme Hook

    // Bestimme, ob der Switch aktiviert sein sollte basierend auf dem aktuellen Theme
    const isDarkMode = theme === DARKMODE;

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomDrawerHeader title="Einstellungen" onPress={()=> navigation.openDrawer()}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Einstellungen</Text>
                {/* Switch für den Themewechsel */}
                <View style={styles.switchContainer}>
                    <Text style={isDarkMode ? styles.textDark : styles.textLight}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
                    <Switch
                        trackColor={{ false: "#FFFFFF", true: "#009FE3" }}
                        thumbColor={isDarkMode ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleTheme}
                        value={isDarkMode}
                    />
                </View>
            </View>
        </View>
    )
}

export default Settings;

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR
    }
})