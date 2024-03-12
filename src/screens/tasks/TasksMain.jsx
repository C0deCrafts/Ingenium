import {Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert} from "react-native";

import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {ICONS} from "../../constants/icons";
import {useTasks} from "../../context/TasksContext";
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

    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {tasks, lists, deleteList} = useDatabase();

    //filtering Tasks for tasksview
    const tasksNotDone = tasks.filter(task => !task.isDone);


    /**TODO - wird mit altem TasksContext gemeacht - ÄNDERN!
     * Is called on Press of the round Button next to a task in the taskslist.
     * will toggle the property done of a task
     * and the task will disappear from the taskslist in the UI as it only shows tasks
     * which are not yet done
     * @param taskId the id of the task which was pressed
     */
    function handleTaskCompleted(taskId) {
        dispatch({
            type: 'TOGGLED_TASK_DONE',
            taskId: taskId,
        });
    }

    /**
     * is called on Press of the more button above the taskList View
     * will open the editing mode for the Lists - where lists can be deleted
     */
    function handleOpenEditTaskLists() {
        setEditTaskListsIsActive(true);
    }

    /**
     * is called on Press of the 'Fertig' button above the taskList View
     * will close the editing mode for the Lists
     */
    function handleCloseEditTaskLists() {
        setEditTaskListsIsActive(false);
    }

    /**
     *
     * @param tasksListId
     */
    /*function handleDeleteTaskList(tasksListId) {
        console.log("DELETE TASK LIST WAS PRESSED: implement logic to delete list with id: ", tasksListId);

        //create Alert
        Alert.alert(
            'Liste löschen',
            'Möchtest du diese Liste wirklich löschen?',
            [
                {
                    text: 'Ja',
                    onPress: () => {
                        console.log(`DELETE LIST ALERT, 'JA' WAS PRESSED:  with id ${tasksListId} will be deleted.`);
                        return dispatch({
                            type: 'DELETED_LIST',
                            tasksListId: tasksListId,
                        });
                    },
                    //styling the alert button for IOs to be red
                    style: 'destructive'
                },
                {
                    text: 'Nein',
                    onPress: () => console.log("DELETE LIST ALERT, 'NEIN' WAS PRESSED"),
                    //styling the alert button for IOs to be blue
                    style: 'cancel'
                },
            ]
        );
    }*/
    function handleDeleteTaskList(listId) {
        Alert.alert(
            'Liste löschen',
            'Möchtest du diese Liste wirklich löschen?',
            [
                {
                    text: 'Ja',
                    onPress: () => deleteList(listId), // Verwende hier die deleteList Funktion aus deinem Kontext
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
     * is called on Press of the Round Button 'Add' in TasksMain Screen
     * shows the Modal, by setting the state of its visibility to true
     */
    function handleOpenModal() {
        setModalIsVisible(true);
        console.log('the insets size:' + insets.bottom);
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
        navigation.navigate("CreateList_Stack");
    }

    /**
     * is called on Press of the 'Neue Aufgabe' Button in
     * the AddTaskModal Component
     * hides the Modal and navigates to the CreatTask Screen
     */
    function handleCreateTask() {
        setModalIsVisible(false);
        navigation.navigate("CreateTask_Screen");
    }

    return (
        <>
            <View style={[isDarkMode ? styles.containerDark : styles.containerLight]}>
                {/*DrawerHeader for Tasks*/}
                <CustomDrawerHeader title="Aufgaben" onPress={() => navigation.openDrawer()}/>

                {/*Outer View Container*/}
                <View style={[isDarkMode ? styles.contentDark : styles.contentLight, styles.contentContainer]}>

                    {/*Tasks*/}
                    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                            Nächste ToDo's
                        </Text>
                        {/*Here the taskLists state is taken and a shallow copy is created using the spread syntax.
                    On the copy by chaining the array methods: flatMap, filter, sort and map
                    it is achieved that all tasks, of all lists with the property done = false are shown sorted in an ascending
                    order by dueDate.
                    This adheres to the principle of immutability of state variables*/}
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
                                            onPress={() => console.log("Neue Funktion machen")}>
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
                                            <Text
                                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS]}>
                                                fällig am {/*new Date(task.dueDate).toLocaleDateString('de-DE')*/}
                                            </Text>
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
                            onPress={() => navigation.navigate("CompletedTasks_Stack")}
                        >
                            <Icon name={ICONS.TASKICONS.COMPLETED}
                                  color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                                  size={22}/>
                            <Text
                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>Erledigt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
                            onPress={() => navigation.navigate("Inbox_Stack")}
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
                            {
                                lists.flat().map((list, index) => {
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
                                                    {index !== lists.flat().length - 1 && (
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
                                            <TouchableOpacity
                                                key={list.listId}
                                                onPress={() => console.log("Navigieren muss wieder implementiert werden, dazu brauchen wir aber dann die Tasks")}
                                            >
                                                <CustomBoxButton
                                                    buttonTextLeft={list.listName}
                                                    iconName={list.iconName}
                                                    iconBoxBackgroundColor={list.iconBackgroundColor}
                                                    iconColor={"white"}
                                                    showForwardIcon={false}
                                                    onPress={() => console.log("Navigieren muss wieder implementiert werden, dazu brauchen wir aber dann die Tasks")}
                                                    isUserIcon={true}
                                                />
                                                {/* Adds a border, except after the last element */}
                                                {index !== lists.flat().length - 1 && (
                                                    <View
                                                        style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                                )}
                                            </TouchableOpacity>
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
                        onPressCreateTask={handleCreateTask}
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
            //should we set paddings like this?
            //paddingTop: insets.top,
            paddingTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
            paddingBottom: insets.bottom + 25,
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
            bottom: insets.bottom - 20,
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
