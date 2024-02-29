import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {ICONS as ICON} from "../../constants/icons";
import Icon from "../Icon";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";

/**
 * # COMPONENT CUSTOMBACKBUTTONWITHSIDEELEMENT
 * Component to use on Screens where there is an Element next to the CustomBackButton
 * f.e. a heading or buttons
 * ### Usage:
 * Is used in the ListTasks and the CompletedTasks Screens

 * @param onPress {function} prop for the navigation function which handles the go Back behaviour
 *                           for the screen where it is used
 * @param elementNextToBackButton prop for the JSX element, which should be rendered next to
 *                                              the back button
 * @returns {JSX.Element}
 * @constructor
 *
 * ### example
 * <pre>
 * <CustomBackButtonWithSideElement
*     onPress={handleGoBack}
*     elementNextToBackButton={
*       <Text style={[isDarkMode? styles.textDark : styles.textLight, styles.headerHeading]}>
*        Erledigt
*     </Text>
*     }
*  />
 * </pre>
 */
function CustomBackButtonWithSideElement({onPress, elementNextToBackButton}) {
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
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.headerTitle]}>Zurück</Text>
                </View>
            </TouchableOpacity>
            <View>
                {elementNextToBackButton}
            </View>
        </View>
    )
}

export default CustomBackButtonWithSideElement;

function getStyles(insets) {
    return StyleSheet.create({
        headerContainer: {
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            paddingTop: insets.top + 30,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        titleContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        textDark: {
            color: DARKMODE.DRAWER_HEADER_LABEL_COLOR,
        },
        textLight: {
            color: LIGHTMODE.TEXT_COLOR,
        },
        headerTitle: {
            fontSize: SIZES.BACK_HEADER_FONTSIZE,
            marginLeft: 5,
        }

    })
}