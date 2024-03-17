import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useTheme} from "../../context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {useDatabase} from "../../context/DatabaseContext";
import {useEffect, useState} from "react";

function CompletedTasks({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    const {tasks, updateTaskIsDone} = useDatabase();

    {/*CODE FOR TOGGLING THE ISDONE PROPERTY OF A TASK*/}
    const [toggledTasks, setToggledTasks] = useState([]);

    /**
     * Event handler for the toggle button of a task.
     * The task is added to toggledTasks state, which will influence its display mode in
     * the UI: lighter opacity & text indicating the task will be moved.
     * Changes to toggledTasks state trigger the useEffect which updates the tasks isDone property in
     * the database and deletes the task from toggledTasks state, after a timeout.
     * @param taskId the id of the task which was pressed
     * @param isDone boolean property of task, inidicating whether is done or not.
     */
    function handleTaskNotCompleted(taskId, isDone) {
        //set the data for toggled task needed in the use Effect
        setToggledTasks([...toggledTasks, {taskId: taskId, isDone: isDone}]);
    }

    /**
     * Sets a timeout, before the execution of updateTaskIsDone and the deletion of the task
     * from the toggled tasks state.
     * This enables a UI response to the user, indicating the task will be moved,
     * before the UI rerenders, only showing tasks which are done.
     */
    useEffect(() => {
        //destructure information needed for updating task and rendering updating
        //text to the UI
        const toggledTasksArray = [...toggledTasks];

        //after timeout set the task is being toggled to false again
        //& update the task in the database
        const taskToggleTimeout = () => {
            setTimeout(async () => {
                for(let toggledTask of toggledTasksArray) {
                    await updateTaskIsDone(toggledTask.taskId, toggledTask.isDone);
                    setToggledTasks(prevState => prevState.filter(t => t.taskId !== toggledTask.taskId));
                }
            }, 2000);
        }
        //only execute on toggling, and not on initial mounting of component
        if(toggledTasks.length !== 0) {
            console.log("UseEffect for toggling task is active ");
            taskToggleTimeout();
        }
        //clear the timeout to prevent memory leaks
        return () => clearTimeout(taskToggleTimeout);
    }, [toggledTasks]);

    /**
     * Is called on press of the Back Button.
     * Navigates back to the TasksMain Screen.
     */
    const handleGoBack = () => {
        navigation.goBack();
    };

    //filter tasks to show tasks belonging to currentList && isDone is false
    const tasksDone = tasks.filter(task => task.isDone);

    return (
        <View  style={[isDarkMode ? styles.containerDark : styles.containerLight]}>
            <CustomBackButton
                onPress={handleGoBack}
                showTitle={true}
                title={"Erledigt"}
            />
            <View style={styles.contentContainer}>
                {/*USER INSTRUCTION*/}
                <View style={
                    [isDarkMode? styles.contentBoxDark : styles.contentBoxLight,
                        styles.instructionBox
                    ]}>
                    <Text style={[isDarkMode? styles.textDark : styles.textLight, styles.textXS, styles.textItalic]}>
                        <Text style={styles.textBold}>Hinweis: </Text>
                        Du kannst noch 30 Tage auf deine Aufgaben
                        zugreifen, bevor sie aus der Liste gelöscht
                        werden. Um eine Aufgabe wiederherzustellen,
                        tippe auf die Aufgabe.
                    </Text>
                </View>

                {/*COMPLETED TASKS*/}
                <ScrollView
                    style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={styles.scrollViewContentContainer}
                >
                    {   /*
                        shows tasks of all taskLists which have the property done === true
                        */

                            tasksDone.map(task => {
                                return (
                                    <TouchableOpacity
                                        key={task.taskId}
                                        style={[isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight, styles.listItemContainer]}
                                        onPress={() => handleTaskNotCompleted(task.taskId, task.isDone)}
                                    >
                                        <View>
                                            {toggledTasks.find(toggledTask => toggledTask.taskId === task.taskId) ?
                                                <Icon name={ICONS.TASKICONS.CIRCLE}
                                                      color={isDarkMode ? DARKMODE.TEXT_COLOR_OPAQUE : LIGHTMODE.TEXT_COLOR_OPAQUE}
                                                      size={20}/> :
                                                <Icon name={ICONS.TASKICONS.CIRCLE_DONE}
                                                      color={isDarkMode ? COLOR.BUTTONLABEL : COLOR.ICONCOLOR_CUSTOM_BLACK}
                                                      size={20}/>
                                            }
                                        </View>
                                        <View style={styles.taskTitleDateColumn}>
                                            {toggledTasks.find(toggledTask => toggledTask.taskId === task.taskId)?
                                                <Text style={[isDarkMode ? styles.opaqueDark : styles.opaqueLight, styles.textNormal]}>
                                                    ...Aufgabe wird verschoben
                                                </Text>
                                                :
                                                <>
                                                    <Text
                                                    style={[
                                                        isDarkMode ? styles.textDark : styles.textLight,
                                                        styles.textNormal,
                                                        styles.textAlignRight
                                                    ]}>
                                                    {task.taskTitle}
                                                </Text>
                                                    <Text style={[
                                                        isDarkMode ? styles.textDark : styles.textLight,
                                                        styles.textXS,
                                                        styles.dueDate,
                                                        styles.textItalic
                                                    ]}>
                                                        Erledigt: ... (Logik implementieren)
                                                    </Text>
                                                </>
                                            }
                                        </View>
                                    </TouchableOpacity>
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
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            paddingHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            paddingHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
        },
        contentContainer: {
            paddingBottom: insets.bottom + 10,
            paddingTop: insets.top + 10,
            flex: 1,
            rowGap: SIZES.SPACING_VERTICAL_DEFAULT,
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
            fontStyle: "italic"
        },
        textAlignRight: {
            textAlign: "right"
        },
        opaqueLight: {
            color: LIGHTMODE.TEXT_COLOR_OPAQUE,
        },
        opaqueDark: {
            color: DARKMODE.TEXT_COLOR_OPAQUE,
        },
        headerHeading: {
            fontSize: SIZES.DRAWER_HEADER_FONTSIZE,
            fontWeight: SIZES.DRAWER_HEADER_FONTWEIGHT,
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
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_SMALL,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: SIZES.SPACING_HORIZONTAL_DEFAULT,
            borderBottomWidth: 1,
        },
        taskTitleDateColumn: {
            alignItems: "flex-end",
            rowGap: SIZES.SPACING_VERTICAL_SMALL,
            flex: 1
        },
    })
}