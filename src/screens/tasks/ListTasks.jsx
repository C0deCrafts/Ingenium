import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions} from "react-native";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useState} from "react";
import CustomButtonSmall from "../../components/buttons/CustomButtonSmall";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {useDatabase} from "../../context/DatabaseContext";
import RoundButton from "../../components/buttons/RoundButton";

function ListTasks({route, navigation}){
    //state to control the editing mode for the taskList View
    const [editTasksIsActive, setEditTasksIsActive] = useState(false);

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    //access the parameter listId passed from the TasksMain Screen
    const {listId} = route.params;

    //access the tasks state from Database Context
    const {tasks, lists, deleteTask, updateTaskIsDone} = useDatabase();

    /**
     * Is called on press of the Back Button.
     * Navigates back to the TasksMain Screen.
     */
    const handleGoBack = () => {
        navigation.goBack();
    };

    /**
     * Is called on press of the edit Task Button
     * navigates to the EditTask Screen.
     */
    function handleNavigateToEditTask() {
        navigation.push("EditTask_Screen");
    }

    /**
     * Is called on press of the more Button.
     * Opens the edit mode in the screen, which enables the user
     * to delete tasks or navigate to the EditTask Screen.
     */
    function handleCloseEditingTasks() {
        setEditTasksIsActive(false);
    }

    /**
     * Is called on press of the 'Fertig' button
     * closes the edit mode for the tasks.
     */
    function handleOpenEditingTasks() {
        setEditTasksIsActive(true);
    }

    /**
     * Is called on Press of the round Button next to a task in the taskslist.
     * Will toggle the property done of a task
     * and the task will disappear from the taskslist in the UI as it only shows tasks
     * which are not yet done.
     * @param taskId the id of the task which was pressed
     * @param isDone the isDone property of the task
     */
    function handleTaskCompleted(taskId, isDone) {
        updateTaskIsDone(taskId, isDone);
    }


    /**
     * Is called on press of the delete task button.
     * Shows an alert to the user, if the user is sure about deleting the task.
     * If the user chooses 'Ja' the task is deleted from the database.
     * If the user chooses 'Nein', the Alert will be closed and the
     * task will not be deleted.
     */
    function handleDeleteTask(taskId) {
        //create Alert
        Alert.alert(
            'Aufgabe löschen',
            'Möchtest du diese Aufgabe wirklich löschen?',
            [
                {
                    text: 'Ja',
                    onPress: () => {
                        console.log(`DELETE TASK ALERT, 'JA' WAS PRESSED: task with id ${taskId} will be deleted.`);
                        return deleteTask(taskId);
                    },
                    //styling the alert button for IOs to be red
                    style: 'destructive'
                },
                {
                    text: 'Nein',
                    onPress: () => console.log("DELETE TASK ALERT, 'NEIN' WAS PRESSED"),
                    //styling the alert button for IOs to be blue
                    style: 'cancel'
                },
            ]
        );
    }

    function handleNavigateToAddTaskToList(listId) {
        //still to implement
    }

    //access the current list title to show it in the heading of the screen
    const currentList = lists.find(list => list.listId === listId);
    const currentScreenTitle = currentList.listName;

    //filter tasks to show tasks belonging to currentList && isDone is false
    const listTasksNotDone = tasks.filter(task => !task.isDone && task.listId === listId);

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButton
                onPress={handleGoBack}
                showCustomElement={true}
                customElement={
                editTasksIsActive?
                    <CustomButtonSmall onPressFunction={handleCloseEditingTasks} title={'Fertig'}/> :
                    <TouchableOpacity
                    onPress={handleOpenEditingTasks}
                    >
                        <Icon name={ICONS.TASKICONS.MORE_OUTLINE}
                             color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                             size={SIZES.MORE_ICON_SIZE}
                        />
                    </TouchableOpacity>
             }
            />
            <View style={styles.contentContainer}>
            {/*show Tasks of List with id which was passed by the route param listId
            need to show only tasks of this list
            need to show tasks sorted ascending by dueDate*/
            }
                <Text style={[isDarkMode? styles.textDark : styles.textLight , styles.header]}>
                    {currentScreenTitle}
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {
                            listTasksNotDone.map(task => {

                                if(editTasksIsActive) {
                                   return (
                                       /*TaskBox editTasksIsActive === true*/
                                       <View
                                           style={styles.taskContainer}
                                           key={task.taskId}
                                       >
                                            <View
                                                style={[
                                                    isDarkMode? styles.taskBoxDark : styles.taskBoxLight,
                                                    styles.taskBoxEditActive
                                                ]}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => handleDeleteTask(task.taskId)}
                                                >
                                                    <Icon name={ICONS.TASKICONS.MINUS}
                                                          color={COLOR.ICONCOLOR_CUSTOM_RED}
                                                          size={SIZES.EDIT_TASKS_ICON_SIZE}
                                                    />
                                                </TouchableOpacity>
                                                <View
                                                    style={styles.taskTitleDateColumnEditActive}
                                                >
                                                    <Text
                                                        style={[
                                                            isDarkMode ? styles.textDark : styles.textLight,
                                                            styles.textNormal,
                                                            styles.textCentered
                                                        ]}>
                                                        {task.taskTitle}
                                                    </Text>
                                                    {/*only show date if the DateString is not empty*/}
                                                    {task.dueDate &&

                                                        <Text style={[
                                                        isDarkMode ? styles.textDark : styles.textLight,
                                                        styles.textXS,
                                                        styles.textItalic
                                                        ]}>
                                                        fällig am {/*new Date(task.dueDate).toLocaleDateString('de-DE')*/}
                                                    </Text>}
                                                </View>
                                                <TouchableOpacity
                                                    onPress={handleNavigateToEditTask}
                                                >
                                                    <Icon name={ICONS.TASKICONS.MORE}
                                                          color={COLOR.ICONCOLOR_CUSTOM_BLUE}
                                                          size={SIZES.EDIT_TASKS_ICON_SIZE}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                       </View>
                                   );

                                } else {
                                    return (
                                        /*TaskBox editTasksIsActive === false*/
                                        <View
                                            style={styles.taskContainer}
                                            key={task.taskId}
                                        >
                                            <View style={[isDarkMode? styles.taskBoxDark : styles.taskBoxLight]}>
                                                <View style={[
                                                    styles.taskUpperBoxEditNotActive,
                                                    isDarkMode ? styles.borderDark : styles.borderLight,
                                                ]}>
                                                    <TouchableOpacity
                                                        onPress={() => handleTaskCompleted(task.taskId, task.isDone)}>
                                                        <Icon
                                                            name={ICONS.TASKICONS.CIRCLE}
                                                            color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>
                                                    <View style={styles.taskTitleDateColumnEditNotActive}
                                                    >
                                                        <Text style={[
                                                            isDarkMode? styles.textDark : styles.textLight,
                                                            styles.textNormal,
                                                            styles.textAlignRight,
                                                        ]}>
                                                            {task.taskTitle}
                                                        </Text>
                                                        {/*only show date if the DateString is not empty*/}
                                                        {task.dueDate &&
                                                            <Text style={[
                                                                isDarkMode ? styles.textDark : styles.textLight,
                                                                styles.textXS,
                                                                styles.textItalic
                                                            ]}>
                                                                fällig
                                                                am {/*new Date(task.dueDate).toLocaleDateString('de-DE')*/}
                                                            </Text>
                                                        }
                                                    </View>
                                                </View>
                                                <View
                                                    style={[styles.taskLowerBoxEditNotActive]}
                                                >
                                                        <Text style={[
                                                            styles.textSmall,
                                                            isDarkMode? styles.textDark : styles.textLight
                                                            ]}>
                                                            {task.taskNotes}
                                                        </Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                }
                            })
                    }
                </ScrollView>
            </View>
            <RoundButton
                onPress={() => handleNavigateToAddTaskToList()}
                buttonStyle={styles.roundButtonPosition}
                iconName={ICONS.TASKICONS.ADD}
            />
        </View>
    )
}

export default ListTasks;

const windowWidth = Dimensions.get("window").width;

function getStyles(insets) {
    return  StyleSheet.create({
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
            flex: 1,
            paddingTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER,
            paddingBottom: insets.bottom + 25,
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
        textSmall: {
            fontSize: SIZES.SCREEN_TEXT_SMALL,
        },
        textXS: {
            fontSize: SIZES.SCREEN_TEXT_XS,
        },
        textItalic: {
            fontStyle: "italic",
        },
        textCentered: {
            textAlign: "center",
        },
        textAlignRight: {
            textAlign: "right",
        },
        header: {
            fontSize: SIZES.SCREEN_HEADER,
            fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
            paddingBottom: SIZES.SPACING_VERTICAL_SMALL,
        },
        taskContainer: {
            paddingBottom: SIZES.SPACING_VERTICAL_DEFAULT,
        },
        taskBoxLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        taskBoxDark: {
            backgroundColor: DARKMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        taskBoxEditActive: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: SIZES.SPACING_HORIZONTAL_DEFAULT,
            padding: 10
        },
        taskUpperBoxEditNotActive: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: SIZES.SPACING_HORIZONTAL_DEFAULT,
            borderBottomWidth: 1,
            padding: 10
        },
        taskLowerBoxEditNotActive: {
            flex: 1,
            alignItems: "flex-start",
            padding: 10
        },
        borderLight: {
            borderColor: LIGHTMODE.BACKGROUNDCOLOR,
        },
        borderDark: {
            borderColor: DARKMODE.BACKGROUNDCOLOR,
        },
        taskTitleDateColumnEditNotActive: {
            alignItems: "flex-end",
            rowGap: SIZES.SPACING_VERTICAL_SMALL,
            flex: 1,
        },
        taskTitleDateColumnEditActive: {
            alignItems: "center",
            rowGap: SIZES.SPACING_VERTICAL_SMALL,
            flex: 1,
        },
        roundButtonPosition: {
            position: "absolute",
            left: (windowWidth / 2) - 35,
            bottom: insets.bottom - 20,
        },
    })
}