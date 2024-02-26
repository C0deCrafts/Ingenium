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

    //theme context provider
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {taskLists} = useTasks();

    //extract all tasks from the taskslist
    const allTasks = taskLists.flatMap(list => list.tasks);


    //TASK PREVIEW
    //implement a function to sort tasks by dueDate ascending for the task preview
    //implement that only tasks with done: true are shown

    function handleTaskCompleted() {
        //logic which sets the task property done to true
        //removes the task from the list
        console.log("INSIDE HANDLETASKCOMPLETED: Task completed was pressed");
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
                    <ScrollView
                        style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={styles.scrollViewContentContainer}
                    >
                        {
                            allTasks.map(task => {
                                return (
                                    <View
                                        key={task.id}
                                        style={[isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight, styles.listItemContainer]}
                                    >
                                        <Pressable onPress={handleTaskCompleted}>
                                            <Icon name={ICONS.TASKICONS.CIRCLE}
                                                  color={isDarkMode ? COLOR.BUTTONLABEL : COLOR.ICONCOLOR_CUSTOM_BLACK}
                                                  size={20}/>
                                        </Pressable>
                                        <Text
                                            style={[isDarkMode ? styles.textDark : styles.textLight]}>{task.title}</Text>
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
                        <Text style={isDarkMode ? styles.textDark : styles.textLight}>Erledigt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
                        onPress={() => navigation.navigate("Inbox_Stack")}
                    >
                        <Icon name={ICONS.TASKICONS.INBOX}
                              color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                              size={SIZES.SCREEN_TEXT_NORMAL}/>
                        <Text style={isDarkMode ? styles.textDark : styles.textLight}>Inbox</Text>
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
                            taskLists.map(list => {
                                return (
                                    <Pressable
                                        //here the id of the list needs to be passed to the next Screen, so there the right list is shown
                                        onPress={() => navigation.navigate("ListTasks_Screen", list.id)}
                                        key={list.id}
                                        style={[isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight, styles.listItemContainer]}
                                    >
                                        <SquareIcon name={list.icon} color={list.color}/>
                                        <Text
                                            style={[isDarkMode ? styles.textDark : styles.textLight]}>{list.title}</Text>
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
            fontSize: SIZES.SCREEN_TEXT_NORMAL,
        },
        textDark: {
            color: DARKMODE.TEXT_COLOR,
        },
        header: {
            fontSize: SIZES.SCREEN_HEADER,
            fontWeight: "bold",
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
            width: '45%',
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
            paddingHorizontal: 20,
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
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderBottomWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            columnGap: 20
        }
    })
}
