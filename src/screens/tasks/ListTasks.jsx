import {Text, View, StyleSheet} from "react-native";
import CustomButton from "../../components/CustomButton";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import CustomBackButton from "../../components/CustomBackButton";


function ListTasks({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const handleGoBack = () => {
        navigation.goBack(); // goBack() aufrufen, wenn der Button gedrückt wird
    };


    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButton onPress={handleGoBack}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>List Tasks</Text>
            </View>
            <CustomButton title={"Punkte im falschen Screen, ist dann im Overlay"} onPressFunction={()=>{navigation.push("EditTask_Screen")}}/>
        </View>
    )
}

export default ListTasks;

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