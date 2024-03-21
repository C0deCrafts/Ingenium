import {Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "../Icon";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

/**
 * ## CardButton Component
 *
 * Renders a Card with BorderRadius and lightmode or darkMode Boxcolor.
 * With a customizable title, Icon and onPressHandler.
 *
 * @param buttonIcon Icon to be shown on the CardButton.
 * @param buttonTitle Title to be shown on the CardButton.
 * @param onPressHandler {function} A function that sets the behaviour on press event of the CardButton.
 * @returns {JSX.Element}
 * @constructor
 */
function CardButton({buttonIcon, buttonTitle, onPressHandler}) {
    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <TouchableOpacity
            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
            onPress={onPressHandler}
        >
            <Icon name={buttonIcon}
                  color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                  size={22}/>
            <Text
                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>{buttonTitle}</Text>
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
});