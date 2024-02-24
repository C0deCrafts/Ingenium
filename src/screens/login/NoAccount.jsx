import {Text, View, StyleSheet} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from "../../constants/context/ThemeContext";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";

function NoAccount(){
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE

    const styles = getStyles(insets);

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>No Account</Text>
            </View>
        </View>
    )
}

export default NoAccount;

function getStyles(insets) {
    return StyleSheet.create({
        containerLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            paddingTop: insets.top,

        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            paddingTop: insets.top,
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
}