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
import TaskPreview from "../../components/taskComponents/TaskPreview";

function ListTasks({route, navigation}){
    //state to control the editing mode for the taskList View
    const [editTasksIsActive, setEditTasksIsActive] = useState(false);

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;


    //access the tasks state from Database Context
    const {tasks, lists, deleteTask} = useDatabase();

    {/*EVENT HANDLERS*/}
    /**
     * Is called on press of the Back Button.
     * Navigates back to the TasksMain Screen.
     */
    const handleGoBack = () => {
        navigation.goBack();
    };

    /**
     * Is called on press of the edit Task Button
     * navigates to the EditTask Screen. Passes the
     * task which user wants to edit as a parameter to
     * the route.
     */
    function handleNavigateToEditTask(task) {
        setEditTasksIsActive(false);
        navigation.push("EditTask_Screen", {taskToEdit: task});
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

    /*
    access the parameter listId passed from the TasksMain Screen
    is a valid listId if a list was chosen
    is null if the button "Alle" for showing all Tasks was pressed
     */
    const {listId} = route.params;

    function handleAddTaskToList() {
        setEditTasksIsActive(false);
        navigation.navigate("CreateTask_Screen", {listIdForAddTask: listId});
    }

    /*
    the following values are initialized differently depending on if a listId or
    undefined was passed to the listId parameter of the route
     */
    //set current list title to show it in the heading of the screen
    let currentScreenTitle;

    if(listId) {
        const currentList = lists.find(list => list.listId === listId);
        currentScreenTitle = currentList.listName;
    } else {
        currentScreenTitle = "Alle";
    }

    /**
     * if the listId passed to the route.params:
     * filter tasks to show tasks belonging to currentList which are not done
     * if undefined is passed to route.params:
     * show all tasks which are not done
     */
    const listTasksNotDone = listId ? tasks.filter(task => !task.isDone && task.listId === listId) : tasks.filter(task => !task.isDone);

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
            {/*
            show Tasks of List with id which was passed by the route param listId
            need to show only tasks of this list
            (need to show tasks sorted ascending by dueDate)
            Exception: user clicked on all tasks -- tasks of all lists will be shown
            */
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
                                                    onPress={() => handleNavigateToEditTask(task)}
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
                                           <TaskPreview
                                           p_taskId={task.taskId}
                                           p_taskIsDone={task.isDone}
                                           taskTitle={task.taskTitle}
                                           taskNotes={task.taskNotes}
                                           isTaskTitlePreview={false}
                                           showDate={true}
                                           dateText={"Fällig am..."}
                                           isTaskCardWithNotes={true}
                                           />
                                        </View>
                                    );
                                }
                            })
                    }
                </ScrollView>
            </View>
            <RoundButton
                onPress={() => handleAddTaskToList()}
                buttonStyle={styles.roundButtonPosition}
                iconName={ICONS.TASKICONS.ADD}
            />
        </View>
    )
}

export default ListTasks;

const windowWidth = Dimensions.get("window").width;

function getStyles(insets) {
    const bottomInsetAdjustment = insets.bottom > 0 ? insets.bottom - 20 : 10;

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
            paddingBottom: bottomInsetAdjustment+ 45,
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
        textItalic: {
            fontStyle: "italic",
        },
        textCentered: {
            textAlign: "center",
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
        taskTitleDateColumnEditActive: {
            alignItems: "center",
            rowGap: SIZES.SPACING_VERTICAL_SMALL,
            flex: 1,
        },
        roundButtonPosition: {
            position: "absolute",
            left: (windowWidth / 2) - 35,
            bottom: bottomInsetAdjustment,
        },
    })
}