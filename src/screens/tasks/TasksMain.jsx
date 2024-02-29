import {Text, View, StyleSheet, ScrollView, Dimensions, Pressable, TouchableOpacity, Modal} from "react-native";

import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {ICONS} from "../../constants/icons";
import {useTasks} from "../../constants/context/TasksContext";
import {useState} from "react";
import {useTheme} from "../../constants/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import Icon from "../../components/Icon";
import SquareIcon from "../../components/SquareIcon";
import AddTaskModal from "../../components/AddTaskModal";

function TasksMain({navigation}) {
    const [modalIsVisible, setModalIsVisible] = useState(false);

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    //theme context provider hook
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    //task context provider hook which provides a the taskListsState
    //and a dispatchFunction to change the state based on actions
    const {taskListsState, dispatch} = useTasks();

    /**
     * Is called on Press of the round Button next to a task in the taskslist
     * will toggle the property done of a task
     * and the task will disappear from the taskslist in the UI as it only shows tasks
     * which are not yet done
     * @param taskId the id of the task which was pressed
     */
    function handleTaskCompleted(taskId) {
        //logic which sets the task property done to true --> implemented in the tasksreducer function
        //the task should not be visible in the list anymore
        console.log("INSIDE HANDLETASKCOMPLETED: Task completed was pressed on task with id: ", taskId);
        dispatch({
            type: 'TOGGLED_TASK_DONE',
            taskId: taskId,
        })
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
                        Meine Aufgaben
                    </Text>
                    {/*Here the taskLists state is taken and a shallow copy is created using the spread syntax.
                    On the copy by chaining the array methods: flatMap, filter, sort and map
                    it is achieved that all tasks, of all lists with the property done = false are shown sorted in an ascending
                    order by dueDate.
                    This adheres to the principle of immutability of state variables*/}
                    <ScrollView
                        style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={styles.scrollViewContentContainer}
                    >
                        {
                            [...taskListsState]
                            .flatMap(list => list.tasks)
                            .filter(task => !task.done)
                            .sort((t1, t2) => new Date(t1.dueDate) - new Date(t2.dueDate))
                            .map(task => {
                                return (
                                    <View
                                        key={task.id}
                                        style={[isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight, styles.listItemContainer]}
                                    >
                                        <Pressable
                                            style={styles.taskCompletedButton}
                                            onPress={() => handleTaskCompleted(task.id)}>
                                            <Icon name={ICONS.TASKICONS.CIRCLE}
                                                  color={isDarkMode ? COLOR.BUTTONLABEL : COLOR.ICONCOLOR_CUSTOM_BLACK}
                                                  size={20}/>
                                        </Pressable>
                                        <View style={styles.taskTitleDateColumn}>
                                            <Text
                                            style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>
                                                {task.title}
                                            </Text>
                                            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS]}>
                                                fällig am {new Date(task.dueDate).toLocaleDateString('de-DE')}
                                            </Text>
                                        </View>
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
                              size={SIZES.SCREEN_TEXT_NORMAL}/>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>Erledigt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
                        onPress={() => navigation.navigate("Inbox_Stack")}
                    >
                        <Icon name={ICONS.TASKICONS.INBOX}
                              color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                              size={SIZES.SCREEN_TEXT_NORMAL}/>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>Inbox</Text>
                    </TouchableOpacity>
                </View>

                {/*TaskLists*/}
                <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                    <View style={styles.headerWithIcon}>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                            Meine Listen
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('more was pressed')
                            }}
                        >
                            <Icon name={ICONS.TASKICONS.MORE_OUTLINE} size={SIZES.SCREEN_HEADER}
                                  color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={styles.scrollViewContentContainer}
                    >
                        {
                            taskListsState.map(list => {
                                return (
                                    <Pressable
                                        //here the id of the list needs to be passed to the next Screen, so there the right list is shown
                                        onPress={() => navigation.navigate("ListTasks_Screen", list.id)}
                                        key={list.id}
                                        style={[isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight, styles.listItemContainer, styles.listItemContainerTaskList]}
                                    >
                                        <SquareIcon name={list.icon} color={list.color}/>
                                        <Text
                                            style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal]}>{list.title}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>

                {/*Round button for navigating to the AddTaskOrListScreen*/}
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={handleOpenModal}
                >
                    <Icon name={ICONS.TASKICONS.ADD} size={35} color={COLOR.BUTTONLABEL}/>
                </TouchableOpacity>

                {/*Conditional rendering of the AddTaskModal Component
                Only when modalIsVisible is set to true*/}
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

function getStyles(insets)  {
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
            paddingTop: insets.top,
            paddingBottom: insets.bottom + 40,
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            rowGap: 20
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
            paddingBottom: 5,
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
            rowGap: 5,
            padding: 20
        },
        roundButton: {
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: COLOR.BUTTONCOLOR,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: (windowWidth / 2) - 30,
            bottom: insets.bottom,
        },
        scrollViewContentContainer: {
            paddingHorizontal: 10,
            paddingVertical: 10,
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
            columnGap: 20,
            borderBottomWidth: 1,
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
            rowGap: 5
        },
    })
}
