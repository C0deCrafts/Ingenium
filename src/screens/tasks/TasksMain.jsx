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


function TasksMain({navigation}) {
    //state to control the visibility of the modal
    const [modalIsVisible, setModalIsVisible] = useState(false);
    //state to control the editing mode for the taskList View
    const [editTaskListsIsActive, setEditTaskListsIsActive] = useState(false);

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    console.log("insets: ", insets)

    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {tasks, lists, deleteList, updateTaskIsDone} = useDatabase();

    //filtering Tasks for tasksview
    const tasksNotDone = tasks.filter(task => !task.isDone);


    /**
     * Is called on Press of the round Button next to a task in the taskslist.
     * will toggle the property done of a task
     * and the task will disappear from the taskslist in the UI as it only shows tasks
     * which are not yet done
     * @param taskId the id of the task which was pressed
     * @param isDone
     */
    function handleTaskCompleted(taskId, isDone) {
        updateTaskIsDone(taskId, isDone);
    }

    /**
     * is called on press of the more button above the taskList View
     * will open the editing mode for the Lists - where lists can be deleted
     */
    function handleOpenEditTaskLists() {
        setEditTaskListsIsActive(true);
    }

    /**
     * is called on press of the 'Fertig' button above the taskList View
     * will close the editing mode for the Lists
     */
    function handleCloseEditTaskLists() {
        setEditTaskListsIsActive(false);
    }

    /**
     * is called on press of the red 'delete' button, visible in editing mode
     * deletes the takslist and tasks belonging to that list from the database.
     * @param listId the id of the list which is deleted
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
     * is called on press of the Round Button 'Add' in TasksMain Screen
     * shows the Modal, by setting the state of its visibility to true
     */
    function handleOpenModal() {
        setModalIsVisible(true);
        setEditTaskListsIsActive(false);
    }

    /**
     * is called on Press of the Round Button 'Close' in AddTask Component
     * hides the Modal, by setting the state of its visibility to false
     */
    function handleCloseModal() {
        setModalIsVisible(false);
    }

    /**
     * is called on Press of the 'Neue Liste' Button in
     * the AddTaskModal Component
     * hides the Modal and navigates to the CreateList Screen
     */
    function handleCreateList() {
        setModalIsVisible(false);
        setEditTaskListsIsActive(false);
        navigation.navigate("CreateList_Stack");
    }

    /**
     * is called on Press of the 'Neue Aufgabe' Button in
     * the AddTaskModal Component
     * hides the Modal and navigates to the CreatTask Screen
     * passes a listId - which is initialized with undefined as user
     * did not choose a list to add the task to - but the parameter is needed
     * for conditional rendering later
     */
    function handleCreateTask(listId) {
        setModalIsVisible(false);
        setEditTaskListsIsActive(false);
        navigation.navigate("CreateTask_Screen", {listId: listId});
    }

    /**
     * Navigates to the ListTasksScreen and shows tasks of a list or all tasks depending on users choice.
     * @param listId the id of the list the user clicked on OR undefined if the user clicked on "Alle".
     */
    function handleNavigateToListTasks(listId) {
        setEditTaskListsIsActive(false);
        navigation.navigate("ListTasks_Screen", {listId: listId});
    }

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
                            {tasksNotDone.map((task, index) => {
                                return (
                                    <View
                                        key={task.taskId}
                                    >
                                        <View
                                            style={[isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight, styles.listItemContainer]}>
                                        <TouchableOpacity
                                            style={styles.taskCompletedButton}
                                            onPress={() => handleTaskCompleted(task.taskId, task.isDone)}>
                                            <Icon name={ICONS.TASKICONS.CIRCLE}
                                                  color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                                                  size={20}/>
                                        </TouchableOpacity>
                                        <View style={styles.taskTitleDateColumn}>
                                            {/*
                                            numberOfLines={1}
                                            ellipsizeMode={"tail"}
                                            Settings to only show one line of text for the title and display '...'
                                            for the words in the title which exceed the width of the container
                                            */}
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode={"tail"}
                                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>
                                                {task.taskTitle}
                                            </Text>
                                            {/*Show date only when dueDate is not an empty string*/}
                                            {task.dueDate && <Text
                                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS]}>
                                                fällig am {/*
                                                Anpassen, wenn Datumsauswahl implementiert wird
                                                new Date(task.dueDate).toLocaleDateString('de-DE')
                                                */}
                                            </Text>}
                                        </View>
                                    </View>

                                        {/* Adds a border, except after the last element */}
                                        {index !== tasks.length - 1 && (
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
                        <TouchableOpacity
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
                            onPress={() => [navigation.navigate("CompletedTasks_Stack"), setEditTaskListsIsActive(false)]}
                        >
                            <Icon name={ICONS.TASKICONS.COMPLETED}
                                  color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                                  size={22}/>
                            <Text
                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>Erledigt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
                            onPress={() => [navigation.navigate("Inbox_Stack"), setEditTaskListsIsActive(false)]}
                        >
                            <Icon name={ICONS.TASKICONS.INBOX}
                                  color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                                  size={22}/>
                            <Text
                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>Inbox</Text>
                        </TouchableOpacity>
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
                            {
                                lists.map((list, index) => {
                                    if (editTaskListsIsActive) {
                                        // Im Bearbeitungsmodus
                                        if (list.listName !== "Ingenium") {
                                            return (
                                                <View
                                                    key={list.listId}
                                                    style={[
                                                        isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight,
                                                        styles.listItemContainer,
                                                        styles.listItemContainerTaskList
                                                    ]}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => handleDeleteTaskList(list.listId)}
                                                    >
                                                        <Icon name={ICONS.TASKICONS.MINUS}
                                                              color={COLOR.ICONCOLOR_CUSTOM_RED}
                                                              size={SIZES.EDIT_TASKS_ICON_SIZE}/>
                                                    </TouchableOpacity>
                                                    <View style={styles.editTaskListItem}>
                                                        <SquareIcon name={list.iconName}
                                                                    backgroundColor={list.iconBackgroundColor}
                                                                    isUserIcon={true}/>
                                                        <Text
                                                            style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>{list.listName}</Text>
                                                    </View>
                                                    {/* Adds a border, except after the last element */}
                                                    {index !== lists.length - 1 && (
                                                        <View
                                                            style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                                    )}
                                                </View>
                                            );
                                        } else {
                                            return null; // Überspringen Sie die Renderung der Liste "Ingenium"
                                        }
                                    } else {
                                        // Ansichtsmodus
                                        return (
                                            <View
                                                key={list.listId}
                                            >
                                                <CustomBoxButton
                                                    buttonTextLeft={list.listName}
                                                    iconName={list.iconName}
                                                    iconBoxBackgroundColor={list.iconBackgroundColor}
                                                    iconColor={"white"}
                                                    showForwardIcon={false}
                                                    onPress={() => handleNavigateToListTasks(list.listId)}
                                                    isUserIcon={true}
                                                />
                                                {/* Adds a border, except after the last element */}
                                                {index !== lists.length - 1 && (
                                                    <View style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                                )}
                                            </View>
                                        );
                                    }
                                })
                            }
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
        textXS: {
            fontSize: SIZES.SCREEN_TEXT_XS,
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
        cardButton: {
            width: '48%',
            justifyContent: "center",
            rowGap: SIZES.SPACING_VERTICAL_SMALL,
            padding: SIZES.SPACING_HORIZONTAL_DEFAULT,
        },
        roundButtonPosition: {
            position: "absolute",
            left: (windowWidth / 2) - 35,
            bottom: bottomInsetAdjustment,
        },
        scrollViewContentContainer: {
            paddingHorizontal: 10,
            paddingVertical: 10,
        },
        listItemContainerLight: {
            //backgroundColor: "yellow",
            //borderBottomColor: LIGHTMODE.BACKGROUNDCOLOR,
        },
        listItemContainerDark: {
            //backgroundColor: DARKMODE.BOX_COLOR,
            //borderBottomColor: DARKMODE.BACKGROUNDCOLOR,
        },
        listItemContainer: {
            marginHorizontal: 10,
            paddingVertical: 12,
            flexDirection: "row",
            columnGap: SIZES.SPACING_HORIZONTAL_DEFAULT - 5,
            //borderBottomWidth: 1,
        },
        listItemContainerTaskList: {
            alignItems: "center",
        },
        taskCompletedButton: {
            paddingTop: 2
        },
        taskTitleDateColumn: {
            flexDirection: "column",
            alignItems: "flex-start",
            rowGap: SIZES.SPACING_VERTICAL_SMALL,
            flex: 1,
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
