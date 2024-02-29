import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import CustomButton from "../../components/buttons/CustomButton";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomBackButtonWithTitle from "../../components/buttons/CustomBackButtonWithSideElement";
import {useState} from "react";
import CustomBackButtonWithSideElement from "../../components/buttons/CustomBackButtonWithSideElement";
import CustomButtonSmall from "../../components/buttons/CustomButtonSmall";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import {useTasks} from "../../constants/context/TasksContext";


/*<CustomButton title={"Punkte im falschen Screen, ist dann im Overlay"} onPressFunction={()=>{navigation.push("EditTask_Screen")}}/>*/


function ListTasks({route, navigation}){
    //state to control the editing mode for the taskList View
    const [editTasksIsActive, setEditTasksIsActive] = useState(false);

    //task context provider hook which provides the taskListsState
    //and a dispatchFunction to change the state based on actions
    const {taskListsState, dispatch} = useTasks();

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    //access the parameter listId passed from the TasksMain Screen
    const {listId} = route.params;

    /**
     * is called on press of the Back Button
     * navigates back to the TasksMain Screen
     */
    const handleGoBack = () => {
        navigation.goBack(); // goBack() aufrufen, wenn der Button gedrückt wird
    };

    /**
     * is called on press of the edit Task Button
     * navigates to the EditTask Screen
     */
    function handleNavigateToEditTask() {
        navigation.push("EditTask_Screen");
    }

    /**
     * is called on press of the more Button
     * opens the edit mode in the screen, which enables the user
     * to delete tasks or navigate to the EditTask Screen
     */
    function handleCloseEditingTasks() {
        setEditTasksIsActive(false);
    }

    /**
     * is called on press of the 'Fertig' button
     * closes the edit mode for the tasks
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
     */
    function handleTaskCompleted(taskId) {
        dispatch({
            type: 'TOGGLED_TASK_DONE',
            taskId: taskId,
        })
    }


    /**
     * Deletes the task
     */
    function handleDeleteTask() {

    }


    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButtonWithSideElement
                onPress={handleGoBack}
                elementNextToBackButton={
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
                <Text style={[isDarkMode? styles.textDark : styles.textLight , styles.header]}>Alle</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {
                        [...taskListsState]
                            .filter(list => list.id === listId)
                            .flatMap(list => list.tasks)
                            .filter(task => !task.done)
                            .sort((t1, t2) => new Date(t1.dueDate) - new Date(t2.dueDate))
                            .map(task => {

                                if(editTasksIsActive) {
                                   return (
                                       /*TaskBox editTasksIsActive === true*/
                                       <View
                                           style={styles.taskContainer}
                                           key={task.id}
                                       >
                                            <View
                                                style={[
                                                    isDarkMode? styles.taskBoxDark : styles.taskBoxLight,
                                                    styles.taskBoxEditActive
                                                ]}
                                            >
                                                <TouchableOpacity
                                                    onPress={handleDeleteTask}
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
                                                        {task.title}
                                                    </Text>
                                                    <Text style={[
                                                        isDarkMode ? styles.textDark : styles.textLight,
                                                        styles.textXS,
                                                        styles.textItalic
                                                    ]}>
                                                        fällig am {new Date(task.dueDate).toLocaleDateString('de-DE')}
                                                    </Text>
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
                                            key={task.id}
                                        >
                                            <View style={[isDarkMode? styles.taskBoxDark : styles.taskBoxLight]}>
                                                <View style={[
                                                    styles.taskUpperBoxEditNotActive,
                                                    isDarkMode ? styles.borderDark : styles.borderLight,
                                                ]}>
                                                    <TouchableOpacity
                                                        onPress={() => handleTaskCompleted(task.id)}>
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
                                                        ]}>
                                                            {task.title}
                                                        </Text>
                                                        <Text style={[
                                                            isDarkMode? styles.textDark : styles.textLight,
                                                            styles.textXS,
                                                            styles.textItalic
                                                        ]}>
                                                            fällig am {new Date(task.dueDate).toLocaleDateString('de-DE')}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={[styles.taskLowerBoxEditNotActive]}
                                                >
                                                        <Text style={[
                                                            styles.textSmall,
                                                            isDarkMode? styles.textDark : styles.textLight
                                                            ]}>
                                                            {task.notes}
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
        </View>
    )
}

export default ListTasks;

function getStyles(insets) {
    return  StyleSheet.create({
        containerLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR
        },
        contentContainer: {
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom + 40,
            paddingHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
        },
        textLight: {
            color: LIGHTMODE.TEXT_COLOR,
        },
        textDark: {
            color: DARKMODE.TEXT_COLOR,
        },
        textNormal: {
            fontSize: SIZES.SCREEN_TEXT_NORMAL
        },
        textSmall: {
            fontSize: SIZES.SCREEN_TEXT_SMALL
        },
        textXS: {
            fontSize: SIZES.SCREEN_TEXT_XS
        },
        textItalic: {
            fontStyle: "italic",
        },
        textCentered: {
            textAlign: "center"
        },
        header: {
            fontSize: SIZES.SCREEN_HEADER,
            fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
            paddingBottom: 5,
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
            width: '70%',
            alignItems: "flex-start",
            rowGap: 5,
            padding: 10
        },
        borderLight: {
            borderColor: LIGHTMODE.BORDER_COLOR,
        },
        borderDark: {
            borderColor: DARKMODE.BORDER_COLOR,
        },
        taskTitleDateColumnEditNotActive: {
            alignItems: "flex-end",
            rowGap: 5,
        },
        taskTitleDateColumnEditActive: {
            alignItems: "center",
            rowGap: 5,
            maxWidth: '70%',
        },
    })
}