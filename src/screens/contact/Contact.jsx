import {Text, View, StyleSheet} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";

function Contact({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomDrawerHeader title="Kontakt" onPress={()=> navigation.openDrawer()}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Kontakt</Text>
            </View>
        </View>
    )
}

export default Contact;

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