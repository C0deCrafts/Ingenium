import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomButton from "../../components/CustomButton";
import {useTheme} from "../../constants/context/ThemeContext";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";


function EditTask({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
        <SafeAreaView  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>EditTask</Text>
            </View>
            <CustomButton title={"Details"} onPressFunction={()=>{navigation.push("EditTaskDetails_Screen")}} />
        </SafeAreaView>
    )
}

export default EditTask;

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