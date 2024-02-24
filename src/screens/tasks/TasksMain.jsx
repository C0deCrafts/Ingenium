import {Text, View, StyleSheet} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import CustomButton from "../../components/CustomButton";
import {useTheme} from "../../constants/context/ThemeContext";

function TasksMain({navigation}) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
            <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                <CustomDrawerHeader title="Aufgaben" onPress={() => navigation.openDrawer()}/>

                <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                    <Text style={isDarkMode ? styles.textDark : styles.textLight}>Aufgaben</Text>
                </View>
                <CustomButton title={"Alle"} onPressFunction={() => {
                    navigation.navigate("ListTasks_Screen")
                }}/>
                <CustomButton title={"Inbox"} onPressFunction={() => {
                    navigation.navigate("Inbox_Stack")
                }}/>
                <CustomButton title={"Erledigt"} onPressFunction={() => {
                    navigation.navigate("CompletedTasks_Stack")
                }}/>
                <CustomButton title={"Neue Aufgabe"} onPressFunction={() => {
                    navigation.navigate("CreateTask_Screen")
                }}/>
                <CustomButton title={"Neue Liste"} onPressFunction={() => {
                    navigation.navigate("CreateList_Stack")
                }}/>
            </View>
    )
}

export default TasksMain;

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