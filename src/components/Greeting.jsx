import { Text, View, StyleSheet } from 'react-native';
import {SIZES, DARKMODE, LIGHTMODE} from '../constants/styleSettings';
import {useTheme} from "../context/ThemeContext";

/**
 * ### Greeting Component
 *
 * Renders a greeting message based on the current time and the provided name.
 * The greeting message changes dynamically based on the time of day.
 *
 * @param {string} name - The name to be displayed in the greeting message.
 *
 * @example
 * // Import the Greeting component
 * import Greeting from "../components/Greeting";
 * // Inside your component's render method, use the Greeting component like this:
 * <Greeting name={"John"} />
 * // This will render a greeting message based on the current time and display the provided name.
 */
const Greeting = ({ name }) => {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const currentHour = new Date().getHours();
    let greetingMessage = "Noch wach?";

    if (currentHour < 5) {
        greetingMessage = "Im Nachtmodus?";
    } else if (currentHour < 12) {
        greetingMessage = "Kaffee schon bereit?";
    } else if (currentHour < 17) {
        greetingMessage = "Guten Tag!";
    } else if (currentHour < 21) {
        greetingMessage = "Guten Abend,";
    }

    return (
        <View style={styles.greetingContainer}>
            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.greetings]}>
                {greetingMessage}
            </Text>
            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.headerName]}>
                {name}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    greetingContainer: {
        height: 90,
        justifyContent: "flex-end",
    },
    greetings: {
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        marginBottom: 0,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
    },
    headerName: {
        fontSize: SIZES.SCREEN_HEADER + 10,
        fontWeight: "300",
    },
});

export default Greeting;
