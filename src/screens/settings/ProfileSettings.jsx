import {Text, View, StyleSheet} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useDatabase} from "../../context/DatabaseContext";
import TaskTitleDateElement from "../../components/taskComponents/TaskTitleDateElement";


function ProfileSettings({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {tasks} = useDatabase();

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomDrawerHeader title="Profil bearbeiten" onPress={()=> navigation.openDrawer()}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Profil bearbeiten</Text>
                {
                    tasks.filter(task => !task.isDone).map(task => {
                        return (
                            <TaskTitleDateElement
                                key={task.taskId}
                                p_taskId={task.taskId}
                                p_taskIsDone={task.isDone}
                                taskTitle={task.taskTitle}
                                isTaskTitlePreview={true}
                                showDate={true}
                                dateText={`The id of the task: ${task.taskId}`}
                                taskIsInCompletedScreen={false}
                            />
                        )})
                }
            </View>
        </View>
    )
}

export default ProfileSettings;

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