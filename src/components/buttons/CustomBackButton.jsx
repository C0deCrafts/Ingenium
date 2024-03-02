import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {ICONS as ICON} from "../../constants/icons";
import Icon from "../Icon";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";

function CustomBackButton({onPress}) {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;
    const styles = getStyles(insets);


    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.titleContainer} onPress={onPress}>
                <Icon name={ICON.BACK.ACTIVE}
                      size={SIZES.BACK_BUTTON_ICON_SIZE}
                      color={isDarkMode ? DARKMODE.ICONCOLOR : LIGHTMODE.ICONCOLOR}
                />
                <View>
                    <Text style={isDarkMode ? styles.headerTitleDark : styles.headerTitleLight}>Zurück</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CustomBackButton;

function getStyles(insets) {
    return StyleSheet.create({
        headerContainer: {
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            paddingTop: insets.top + 30,
        },
        titleContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        headerTitleLight: {
            fontSize: SIZES.BACK_HEADER_FONTSIZE,
            color: LIGHTMODE.DRAWER_HEADER_LABEL_COLOR,
            marginLeft: 5,
        },
        headerTitleDark: {
            fontSize: SIZES.BACK_HEADER_FONTSIZE,
            color: DARKMODE.DRAWER_HEADER_LABEL_COLOR,
            marginLeft: 5,
        }

    })
}