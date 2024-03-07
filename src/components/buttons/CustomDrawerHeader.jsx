import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "../Icon";
import {ICONS} from "../../constants/icons";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";

/**
 * ## CustomDrawerHeader Component
 *
 * This component represents a custom header for drawer navigation.
 * It displays a burger menu icon on the left side and a title on the right side.
 * Users can interact with the menu icon to open the drawer.
 * The appearance of the header is determined by the current theme (dark/light).
 *
 * @param {string} title - The title to be displayed in the header.
 * @param {Function} onPress - Function to be called when the menu icon is pressed.
 *
 * @example
 * // Inside your drawer navigation component, use the CustomDrawerHeader component like this:
 *  <CustomDrawerHeader title="Aufgaben" onPress={() => navigation.openDrawer()}/>
 */
function CustomDrawerHeader({title, onPress}){
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;
    const styles = getStyles(insets);

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onPress}>
                <Icon name={ICONS.DRAWER_MENU.ACTIVE}
                      size={SIZES.DRAWER_BUTTON_ICON_SIZE}
                      color={isDarkMode ? DARKMODE.ICONCOLOR : LIGHTMODE.ICONCOLOR}
                />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={isDarkMode ? styles.headerTitleDark : styles.headerTitleLight}>{title}</Text>
            </View>
        </View>
    )
}

export default CustomDrawerHeader;

function getStyles(insets) {
   return StyleSheet.create({
        headerContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            paddingTop: insets.top + 30,
        },
        titleContainer: {
            flex: 1,
            alignItems: "flex-end"
        },
        headerTitleLight: {
            fontSize: SIZES.DRAWER_HEADER_FONTSIZE,
            fontWeight: SIZES.DRAWER_HEADER_FONTWEIGHT,
            color: LIGHTMODE.TEXT_COLOR,
        },
        headerTitleDark: {
            fontSize: SIZES.DRAWER_HEADER_FONTSIZE,
            fontWeight: SIZES.DRAWER_HEADER_FONTWEIGHT,
            color: DARKMODE.TEXT_COLOR,
        }
    })
}