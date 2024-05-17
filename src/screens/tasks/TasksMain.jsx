import {Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert} from "react-native";

import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {ICONS} from "../../constants/icons";
import {useState} from "react";
import {useTheme} from "../../context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import Icon from "../../components/Icon";
import SquareIcon from "../../components/SquareIcon";
import AddTaskModal from "../../components/modals/AddTaskModal";
import CustomButtonSmall from "../../components/buttons/CustomButtonSmall";
import RoundButton from "../../components/buttons/RoundButton";
import CustomBoxButton from "../../components/buttons/CustomBoxButton";
import {useDatabase} from "../../context/DatabaseContext";
import TaskPreview from "../../components/taskComponents/TaskPreview";
import CardButton from "../../components/buttons/CardButton";

import {formatDate, sortTasksByDueDate} from "../../utils/utils"
import {useNavContext} from "../../context/NavContext";

/**
 * ### TasksMain component
 *
 * This component displays the main view of tasks and task lists. It enables the user to navigate to other task screens
 * (Completed Tasks, Inbox, Create Task, Create List, List Tasks), mark tasks as done, delete task lists, and add new
 * tasks and lists.
 * Two 'lists' are always visible and cannot be deleted:
 * - **Ingenium**: Default list where all tasks coming to the user's inbox are saved (Feature available in version 2).
 * - **Alle**: Overview of all the user's tasks, regardless of which list they originally belong to.
 *
 * This screen component is the main overview of the task feature in the app, and the first screen in the Tasks navigation stack.
 *
 * #### Functionality:
 * - **Theme Adjustment**: Uses the `useTheme` hook to adapt to dark or light mode.
 * - **Toggling Done Status for Tasks**: Allows users to mark tasks as done.
 * - **Edit Mode for Task Lists**: Users can delete lists by entering and exiting edit mode.
 * - **Modal for Adding Tasks/Lists**: Opens a modal to add new tasks or lists - which shows buttons for navigation to
 * the corresponding screens.
 * - **Navigation**: Provides navigation to various screens through clickable UI elements.
 *
 * #### Structure:
 * 1. **Header with Navigation Drawer**: Includes a button to open the navigation menu.
 * 2. **Next Tasks View**: Displays upcoming tasks sorted by due date.
 * 3. **Navigation Area**: CardButtons for navigating to 'Completed Tasks' and 'Inbox'.
 * 4. **All Task-Lists View**: Displays all task lists. In edit mode, users can delete lists. Each list is clickable to
 * show tasks.
 * 5. **Add Task & List Button**: Floating action button for adding a new task or list, opening a modal.
 *
 * ### Elements:
 *  - **CustomDrawerHeader**: Custom header component for opening the drawer navigation.
 *  - **ScrollView**: Container for displaying tasks and lists in a scrollable view.
 *  - **TaskPreview**: Displays a preview of individual tasks with title and due date.
 *  - **CardButton**: Custom button with an icon and optional badge count, used for navigation.
 *  - **CustomBoxButton**: Button for displaying task lists and the "All" button.
 *  - **RoundButton**: Floating action button for adding new tasks or lists.
 *  - **AddTaskModal**: Modal for choosing between creating a new task or list.
 *  - **CustomButtonSmall**: Small button used for exiting the edit mode for task lists.
 *  - **Icon**: Component for displaying icons.
 *  - **SquareIcon**: Component for displaying square icons with a background color.
 *
 * With its comprehensive functionality and intuitive user interface, the TasksMain component serves as the central hub
 * for all task management activities within the application, ensuring users can efficiently organize and manage their tasks.
 */
function TasksMain({navigation}) {
    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    //import of needed state and methods from the database context
    const {tasks, lists, deleteList} = useDatabase();

    //state to control the visibility of the modal
    const [modalIsVisible, setModalIsVisible] = useState(false);
    //state to control the editing mode for the taskList View
    const [editTaskListsIsActive, setEditTaskListsIsActive] = useState(false);

    const {notificationCount} = useNavContext();


    {/*EVENT HANDLERS*/}
    /**
     * This event handler is called on press of the more button above the taskList View.
     * It opens the editing mode for the Lists (where lists can be deleted), by setting the
     * state 'editTasksListsIsActive' to true. The changes in the UI are achieved with conditional
     * rendering depending on the Boolean 'editTaskListsIsActive'.
     */
    function handleOpenEditTaskLists() {
        setEditTaskListsIsActive(true);
    }

    /**
     * This event handler is called on press of the 'Fertig' button above the taskList View
     * It closes the editing mode for the lists, by setting the state 'editTasksListsIsActive' to false.
     */
    function handleCloseEditTaskLists() {
        setEditTaskListsIsActive(false);
    }

    /**
     * This event handler is called on press of the red 'delete' button, visible in editing mode of the task lists.
     *
     * Shows an alert dialog to the user, where the action 'delete task' can be either accepted or dismissed.
     * If the user accepts, it deletes the task list and tasks belonging to that list from the database, by calling the
     * function deleteList provided to the screen from the database context. Expects the parameter listId,
     * to be able to delete the correct list.
     *
     * @param listId {number} - The id of the list, which should be deleted.
     */
    function handleDeleteTaskList(listId) {
        Alert.alert(
            'Liste löschen',
            'Möchtest du diese Liste wirklich löschen?',
            [
                {
                    text: 'Ja',
                    onPress: () => deleteList(listId),
                    style: 'destructive',
                },
                {
                    text: 'Nein',
                    style: 'cancel',
                },
            ]
        );
    }

    /**
     * This event handler is called on press of the 'Round Button' component 'Add' in TasksMain Screen.
     * The  'setModalIsVisible' state is set to true. Achieved by conditional rendering, a transparent Modal covering
     * the whole screen is opened.
     * The state 'setEditTasksListIsActive' is set to false, to assure the editing mode for task lists is closed again
     * on reentering the TasksMain screen, if the user did not close it manually.
     */
    function handleOpenModal() {
        setModalIsVisible(true);
        setEditTaskListsIsActive(false);
    }

    /**
     * This event handler is called on Press of the 'Round Button' component 'Close' in 'AddTaskModal'.
     * It hides the Modal, by setting the state 'setModalIsVisible' to false.
     */
    function handleCloseModal() {
        setModalIsVisible(false);
    }

    /**
     * This event handler is called on Press of the 'Neue Liste' Button in
     * the 'AddTaskModal' component.
     * It hides the Modal by setting 'editTaskListsIsActive' to false and navigates to the 'CreateList' screen
     * by dispatching a navigation action.
     *
     * The state 'setEditTasksListIsActive' is set to false, to assure the editing mode for task lists is closed again
     * on reentering the TasksMain screen, if the user did not close it manually.
     */
    function handleCreateList() {
        setModalIsVisible(false);
        setEditTaskListsIsActive(false);
        navigation.navigate("CreateList_Stack");
    }

    /**
     * This event handler is called when the 'Neue Aufgabe' button in the 'AddTaskModal' component of the 'TasksMain'
     * screen is pressed.
     *
     * **Actions:**
     * - Hides the modal by setting 'editTaskListsIsActive' to false.
     * - Navigates to the 'CreateTask' screen by dispatching a navigation action.
     *
     * **Explanation of the listId parameter:**
     * - The `listId` parameter is passed to the route's parameters when dispatching the navigation action.
     * - It should be initialized with `undefined` because task creation is initiated from a context where no specific
     * list has been selected yet.
     * - This initialization is necessary because the route parameter `listId` is accessed through `route.params` in
     * the 'CreateTask' screen.
     * - In the 'CreateTask' screen, `listId` is used to display a preselected list in the task creation UI:
     *  - because 'undefined' is passed to the params th preselected list will be 'Ingenium'
     *  - in other cases, when a valid listId is passed, the preselected list is the list from which the task
     *  creation action was initiated.
     *
     * @param {undefined} listId - The `listId` parameter should be initialized with `undefined` as task creation is
     * initiated from a context where no specific list has been selected yet.
     */
    function handleCreateTask(listId) {
        setModalIsVisible(false);
        setEditTaskListsIsActive(false);
        navigation.navigate("CreateTask_Screen", {listId: listId});
    }

    /**
     * This event handler is called on press of one of the lists in the list view.
     * It navigates to the 'ListTasks' screen and shows the tasks of the chosen list or all tasks if 'Alle' was clicked.
     *
     * The state 'setEditTasksListIsActive' is set to false, to assure the editing mode for task lists is closed again
     * on reentering the TasksMain screen, if the user did not close it manually.
     *
     * **Explanation of listId parameter:**
     * - The `listId` parameter is passed to the route's parameters when dispatching the navigation action.
     * - It should be initialized with the listId of the list the user clicked on, or undefined if the user
     * clicked on the list 'Alle'.
     * - This is necessary because the route parameter `listId` is accessed through `route.params` in
     * the 'CreateTask' screen, where it is needed to conditionally render the all tasks of the user, or only
     * the tasks belonging to one list.
     *
     * @param listId {number|undefined} - The id of the list the user clicked on OR undefined if the user
     *                                    clicked on 'Alle'.
     */
    function handleNavigateToListTasks(listId) {
        setEditTaskListsIsActive(false);

        console.log("Navigation to listtasks screen: the  list id is - ", listId);
        console.log("Type of list id ", typeof listId);

        navigation.navigate("ListTasks_Screen", {listId: listId});
    }

    //filters tasks for tasks view, to only show tasks which are not done
    const tasksNotDone = tasks.filter(task => !task.isDone);
    //Sorts the tasks by due date with a function provided by utils.js
    const sortedTasks = sortTasksByDueDate(tasksNotDone);

    return (
        <>
            <View style={[isDarkMode ? styles.containerDark : styles.containerLight]}>
                {/*DrawerHeader for Tasks*/}
                <CustomDrawerHeader title="Aufgaben" onPress={() => [navigation.openDrawer(),setEditTaskListsIsActive(false)]}/>

                {/*Outer View Container*/}
                <View style={[isDarkMode ? styles.contentDark : styles.contentLight, styles.contentContainer]}>

                    {/*Tasks*/}
                    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                            Nächste ToDo's
                        </Text>
                        <ScrollView
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                            contentContainerStyle={styles.scrollViewContentContainer}
                        >
                            {sortedTasks.map((task, index) => {
                                const date = task.dueDate ? `Fällig am ${formatDate(task.dueDate)}` : "";
                                return (
                                    <View key={task.taskId}>
                                        <TaskPreview
                                        p_taskId={task.taskId}
                                        p_taskIsDone={task.isDone}
                                        taskTitle={task.taskTitle}
                                        isTaskTitlePreview={true}
                                        showDate={true}
                                        dateText={date}
                                        taskIsInCompletedScreen={false}
                                        />
                                        {/* Adds a border, except after the last element */}
                                        {index !== tasksNotDone.length - 1 && (
                                            <View style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                        )}
                                    </View>
                                )
                            })
                            }
                        </ScrollView>
                    </View>

                    {/*CompletedTasks and Inbox*/}
                    <View style={styles.cardButtonContainer}>
                        <CardButton buttonTitle={"Erledigt"} buttonIcon={ICONS.TASKICONS.COMPLETED}
                                    onPressHandler={
                                        () => [navigation.navigate("CompletedTasks_Stack"),
                                            setEditTaskListsIsActive(false)]}
                        />
                        <CardButton buttonTitle={"Inbox"}
                                    badgeCount={notificationCount}
                                    buttonIcon={ICONS.TASKICONS.INBOX}
                                    onPressHandler={
                                    // händische navigation, damit der Tab markiert wird!
                                        () => [navigation.navigate("Notification_Tab", {
                                            screen: "Inbox_Stack"
                                        }),
                                            setEditTaskListsIsActive(false)]}
                        />
                    </View>
                    {/*TaskLists*/}
                    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                        <View style={styles.headerWithIcon}>
                            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                                Meine Listen
                            </Text>
                            {   /*Conditionally render more button, when editTaskListsIsActive === false*/
                                !editTaskListsIsActive &&
                                <TouchableOpacity
                                    onPress={handleOpenEditTaskLists}
                                >
                                    <Icon name={ICONS.TASKICONS.MORE_OUTLINE}
                                          size={SIZES.MORE_ICON_SIZE}
                                          color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}/>
                                </TouchableOpacity>
                            }
                            { /*Conditionally render done editing button, when editTaskListsIsActive === true*/
                                editTaskListsIsActive &&
                                <CustomButtonSmall title={"Fertig"} onPressFunction={handleCloseEditTaskLists}/>
                            }

                        </View>
                        <ScrollView
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                            contentContainerStyle={styles.scrollViewContentContainer}
                        >
                            {/*Button for All Tasks -- Rendered only when the editing mode is not active*/}
                            {!editTaskListsIsActive &&
                                <>
                                    <CustomBoxButton
                                        buttonTextLeft={"Alle"}
                                        iconName={ICONS.TASKICONS.LIST}
                                        iconColor={"white"}
                                        iconBoxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_VIOLET}
                                        onPress={() => handleNavigateToListTasks(undefined)}
                                        showForwardIcon={false}
                                    />
                                    <View style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                </>
                            }
                            {/*Render tasklists*/}
                            {lists.map((list, index) => {
                                if (editTaskListsIsActive) {
                                    //in list editing mode
                                    if (list.listName !== "Ingenium") {
                                        return (
                                            <View
                                                key={list.listId}
                                                style={[styles.listItemContainer, styles.listItemContainerTaskList
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => handleDeleteTaskList(list.listId)}>
                                                    <Icon name={ICONS.TASKICONS.MINUS}
                                                          color={COLOR.ICONCOLOR_CUSTOM_RED}
                                                          size={SIZES.EDIT_TASKS_ICON_SIZE}/>
                                                </TouchableOpacity>
                                                <View style={styles.editTaskListItem}>
                                                    <SquareIcon name={list.iconName}
                                                                backgroundColor={list.iconBackgroundColor}
                                                                isUserIcon={true}/>
                                                    <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>{list.listName}</Text>
                                                </View>
                                                {/* Adds a border, except after the last element */}
                                                {index !== lists.length - 1 && (
                                                    <View style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                                )}
                                            </View>
                                        );
                                    } else {
                                        return null; //skip rendering the list Ingenium, because it shall not be deleted
                                    }
                                } else {
                                    // in list preview mode
                                    return (
                                        <View key={list.listId}>
                                            <CustomBoxButton
                                                buttonTextLeft={list.listName}
                                                iconName={list.iconName}
                                                iconBoxBackgroundColor={list.iconBackgroundColor}
                                                iconColor={"white"}
                                                showForwardIcon={false}
                                                onPress={() => {
                                                    handleNavigateToListTasks(list.listId)
                                                }}
                                                isUserIcon={true}
                                            />
                                            {/* Adds a border, except after the last element */}
                                            {index !== lists.length - 1 && (
                                                <View style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                            )}
                                        </View>
                                    );
                                }
                            })}
                        </ScrollView>
                    </View>

                    {/*Round button for navigating to the AddTaskOrListScreen*/}
                    <RoundButton
                        onPress={handleOpenModal}
                        buttonStyle={styles.roundButtonPosition}
                        iconName={ICONS.TASKICONS.ADD}
                    />

                    {/*Conditional rendering of the AddTaskModal Component
                    only when modalIsVisible is set to true*/}
                    {modalIsVisible && <AddTaskModal
                        visible={modalIsVisible}
                        onPressCreateList={handleCreateList}
                        onPressCreateTask={() => handleCreateTask(undefined)}
                        onPressCloseModal={handleCloseModal}
                    />}
                </View>
            </View>
        </>
    )
}

export default TasksMain;

const windowWidth = Dimensions.get("window").width;

function getStyles(insets) {
    // Bestimme einen Schwellenwert für den unteren Inset. Wenn der Inset größer als dieser Wert ist,
    // bedeutet das, dass das Gerät eine Home-Indikatorleiste oder ähnliche Features hat.
    const bottomInsetAdjustment = insets.bottom > 0 ? insets.bottom - 20 : 10;

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
            paddingTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
            paddingBottom: bottomInsetAdjustment + 45,
            paddingHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
            rowGap: SIZES.SPACING_VERTICAL_DEFAULT,
        },
        contentLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        },
        contentDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
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
        header: {
            fontSize: SIZES.SCREEN_HEADER,
            fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
            marginBottom: 10,
        },
        headerWithIcon: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        contentBoxLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        contentBoxDark: {
            backgroundColor: DARKMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        cardButtonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            height: 80,
        },
        roundButtonPosition: {
            position: "absolute",
            left: (windowWidth / 2) - 35,
            bottom: bottomInsetAdjustment,
        },
        scrollViewContentContainer: {
            padding: 10
        },
        listItemContainer: {
            paddingHorizontal: 10,
            paddingVertical: 12,
            flexDirection: "row",
            columnGap: SIZES.SPACING_HORIZONTAL_DEFAULT - 5,
        },
        listItemContainerTaskList: {
            alignItems: "center",
        },
        editTaskListItem: {
            flexDirection: "row",
            alignItems: "center",
            columnGap: 15,
        },
        separatorLight: {
            height: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            marginHorizontal: 10,
        },
        separatorDark: {
            height: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            marginHorizontal: 10,
        },
    })
}
