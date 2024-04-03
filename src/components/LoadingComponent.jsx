import {ActivityIndicator, View, StyleSheet, Modal, Text} from 'react-native';
import {useTheme} from "../context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../constants/styleSettings";

function LoadingComponent({message}){
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <Modal transparent={true} animationType="none">
            <View style={isDarkMode ? styles.modalBackgroundDark : styles.modalBackgroundLight}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR} animating={true} />
                    {message && <Text style={isDarkMode ? styles.loadingTextDark : styles.loadingTextLight}>{message}</Text>}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackgroundLight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
    },
    modalBackgroundDark: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DARKMODE.BACKGROUNDCOLOR
    },
    activityIndicatorWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    loadingTextLight: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
        color: LIGHTMODE.TEXT_COLOR
    },
    loadingTextDark: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
        color: DARKMODE.TEXT_COLOR
    },
});

export default LoadingComponent;
