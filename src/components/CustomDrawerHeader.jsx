import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import {ICONS} from "../constants/icons";
import {DARKMODE, LIGHTMODE, SIZES} from "../constants/styleSettings";
import {useTheme} from "../constants/context/ThemeContext";

function CustomDrawerHeader({title, onPress}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

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

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        paddingTop: SIZES.PADDING_TOP_DRAWER_HEADER_FROM_SAFEAREAVIEW,
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