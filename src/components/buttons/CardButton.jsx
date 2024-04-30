import {Text, StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "../Icon";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

/**
 * ### CardButton Component
 *
 * Renders a Card with BorderRadius and lightmode or darkMode Boxcolor.
 * With a customizable title, Icon and onPressHandler.
 *
 * #### Features:
 * - **Badge Count**: Allows displaying a notification count on the CardButton to highlight important information.
 *
 * @param buttonIcon Icon to be shown on the CardButton.
 * @param buttonTitle Title to be shown on the CardButton.
 * @param onPressHandler {function} A function that sets the behaviour on press event of the CardButton.
 * @param badgeCount - Count for the badge to be displayed on the CardButton.
 *
 * @example
 * // Import the CardButton component
 * import CardButton from "../../components/CardButton";
 * // Inside your component's render method, use the CardButton component like this:
 * <CardButton
 *    buttonIcon={"iconName"}
 *    buttonTitle={"Button Title"}
 *    onPressHandler={() => {console.log("Button pressed")}}
 *    badgeCount={3}
 * />
 *
 * // This will render a CardButton with the specified icon, title, and badge count, with the specified behavior on press.
 */
function CardButton({buttonIcon, buttonTitle, onPressHandler, badgeCount}) {
    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <TouchableOpacity
            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
            onPress={onPressHandler}
        >
            <View style={styles.iconAndBadgeContainer}>
                <Icon name={buttonIcon}
                      color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                      size={22}/>
                {badgeCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badgeCount}</Text>
                    </View>
                )}
            </View>
            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
}

export default CardButton;

const styles = StyleSheet.create({
    contentBoxLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
    },
    contentBoxDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
    },
    cardButton: {
        width: '48%',
        justifyContent: "center",
        rowGap: SIZES.SPACING_VERTICAL_SMALL,
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
    },
    textNormal: {
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    iconAndBadgeContainer: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    badge: {
        backgroundColor: 'red',
        paddingHorizontal: 5,
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
});