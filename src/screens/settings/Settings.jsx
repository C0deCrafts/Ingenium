import {Text, View, StyleSheet} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import CustomBoxButton from "../../components/buttons/CustomBoxButton";
import {ICONS} from "../../constants/icons";

function Settings({navigation}){
    const { theme, setSpecificTheme } = useTheme(); // Verwende den useTheme Hook

    // Bestimme, ob der Switch aktiviert sein sollte basierend auf dem aktuellen Theme
    const isDarkMode = theme === DARKMODE;

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomDrawerHeader title="Einstellungen" onPress={()=> navigation.openDrawer()}/>

            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Anzeige</Text>
                <View style={styles.boxButtons}>
                    <CustomBoxButton
                        buttonTextLeft="Dunkel"
                        isSelected={isDarkMode}
                        isUserIcon={false}
                        iconName={isDarkMode ? ICONS.THEME_ICONS.DARK_ACTIVE : ICONS.THEME_ICONS.DARK_INACTIVE}
                        iconColor={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                        showForwardIcon={false}
                        onPress={()=> setSpecificTheme(DARKMODE)}
                    />
                </View>
                <View style={styles.boxButtons}>
                    <CustomBoxButton
                        buttonTextLeft="Hell"
                        isSelected={!isDarkMode}
                        isUserIcon={false}
                        iconName={!isDarkMode ? ICONS.THEME_ICONS.LIGHT_ACTIVE : ICONS.THEME_ICONS.LIGHT_INACTIVE}
                        iconColor={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                        showForwardIcon={false}
                        onPress={()=> setSpecificTheme(LIGHTMODE)}
                    />
                </View>

                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Stundenplan</Text>
                <View style={styles.boxButtons}>
                    <CustomBoxButton buttonTextLeft="Stundenplan exportieren"
                                     iconName={ICONS.EXPORT.INACTIVE}
                                     iconColor={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
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
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        marginTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
    },
    contentDark: {
        flex: 1,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        marginTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR
    },
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        paddingVertical: SIZES.SPACING_HORIZONTAL_SMALL
    },
    boxButtons: {
        marginBottom: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    }

})