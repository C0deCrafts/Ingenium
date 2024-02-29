import {Text, View, StyleSheet, Pressable, ScrollView} from "react-native";
import {useTheme} from "../../constants/context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButtonWithTitle from "../../components/CustomBackButtonWithTitle";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import {useTasks} from "../../constants/context/TasksContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";

function CompletedTasks({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    const {taskListsState, dispatch} = useTasks();

    /**
     * Is called on Press of the round Button next to a task in the taskslist
     * will toggle the property done of a task
     * and the task will disappear from the taskslist in the UI as it only shows tasks
     * which are done
     * @param taskId the id of the task which was pressed
     */
    function handleTaskNotCompleted(taskId) {
        console.log("INSIDE HANDLETASKNOTCOMPLETED: Task not completed was pressed on task with id: ", taskId);
        dispatch({
            type: 'TOGGLED_TASK_DONE',
            taskId: taskId,
        })
    }


    //TODO: make margins and insets vertical and horizontal, create content boxes, add text for the doneDates

    const handleGoBack = () => {
        navigation.goBack(); // goBack() aufrufen, wenn der Button gedrückt wird
    };

    return (
        <View  style={[isDarkMode ? styles.containerDark : styles.containerLight]}>
            <CustomBackButtonWithTitle onPress={handleGoBack} heading={"Erledigt"}/>
            <View style={styles.contentContainer}>
                {/*USER INSTRUCTION*/}
                <View style={[isDarkMode? styles.contentBoxDark : styles.contentBoxLight, styles.instructionBox]}>
                    <Text style={[isDarkMode? styles.textDark : styles.textLight, styles.textXS, styles.textItalic]}>
                        <Text style={styles.textBold}>Hinweis:</Text> Du kannst noch 30 Tage auf deine Aufgaben
                        zugreifen, bevor sie aus der Liste gelöscht
                        werden. Um eine Aufgabe wiederherzustellen, tippe auf die Aufgabe.
                    </Text>
                </View>

                {/*COMPLETED TASKS*/}
                <ScrollView
                    style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={styles.scrollViewContentContainer}
                >
                    {
                        [...taskListsState]
                            .flatMap(list => list.tasks)
                            .filter(task => task.done)
                            .sort((t1, t2) => new Date(t1.dueDate) - new Date(t2.dueDate))
                            .map(task => {
                                return (
                                    <Pressable
                                        key={task.id}
                                        style={[isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight, styles.listItemContainer]}
                                        onPress={() => handleTaskNotCompleted(task.id)}
                                    >
                                        <View><Icon name={ICONS.TASKICONS.CIRCLE_DONE}
                                                 color={isDarkMode ? COLOR.BUTTONLABEL : COLOR.ICONCOLOR_CUSTOM_BLACK}
                                                 size={20}/></View>
                                        <View style={styles.taskTitleDateColumn}>
                                            <Text
                                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>
                                                {task.title}
                                            </Text>
                                            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS,styles.dueDate]}>
                                                Erledigt am ... (Logik implementieren)
                                            </Text>
                                        </View>
                                    </Pressable>
                                )
                            })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default CompletedTasks;

function getStyles(insets) {
    return StyleSheet.create({
        containerLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR
        },
        contentContainer: {
            paddingBottom: insets.bottom + 10,
            paddingTop: insets.top + 10,
            paddingHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
            flex: 1,
            rowGap: 10
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
        textXS: {
        fontSize: SIZES.SCREEN_TEXT_XS,
        },
        textBold: {
            fontWeight: "bold"
        },
        textItalic: {
            fontStyle: "italic",
        },
        scrollViewContentContainer: {
            paddingHorizontal: 10,
            paddingVertical: 10,
        },
        contentBoxLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        contentBoxDark: {
            backgroundColor: DARKMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        instructionBox: {
            paddingHorizontal: 10,
            paddingVertical: 12,
        },
        listItemContainerLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
            borderBottomColor: LIGHTMODE.BACKGROUNDCOLOR,
        },
        listItemContainerDark: {
            backgroundColor: DARKMODE.BOX_COLOR,
            borderBottomColor: DARKMODE.BACKGROUNDCOLOR,
        },
        listItemContainer: {
            paddingHorizontal: 5,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: 20,
            borderBottomWidth: 1,
        },
        taskTitleDateColumn: {
            flexDirection: "column",
            alignItems: "flex-end",
            rowGap: 5
        },
    })
}