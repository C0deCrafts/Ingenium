import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import CustomButton from "../../components/CustomButton";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomBackButtonWithTitle from "../../components/CustomBackButtonWithSideElement";
import {useState} from "react";
import CustomBackButtonWithSideElement from "../../components/CustomBackButtonWithSideElement";
import CustomButtonSmall from "../../components/CustomButtonSmall";
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

    const handleGoBack = () => {
        navigation.goBack(); // goBack() aufrufen, wenn der Button gedrückt wird
    };

    function handleCloseEditingTasks() {
        setEditTasksIsActive(false);
    }

    function handleOpenEditingTasks() {
        setEditTasksIsActive(true);
    }

    function handleTaskDone() {
        console.log("Handle task done was pressed");
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
                                       <Text>{task.title}</Text>
                                   );

                                } else {
                                    return (
                                        /*TaskBox editTasksIsActive === false*/
                                        <View style={styles.tasksContainer}>
                                            <View style={[isDarkMode? styles.taskBoxDark : styles.taskBoxLight]}>
                                                <View style={[
                                                    styles.taskUpperContainerEditNotActive,
                                                    isDarkMode ? styles.borderDark : styles.borderLight,
                                                ]}>
                                                    <TouchableOpacity
                                                        onPress={handleTaskDone}>
                                                        <Icon
                                                            name={ICONS.TASKICONS.CIRCLE}
                                                            color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>
                                                    <View style={[
                                                        styles.taskTitleDateColumn,
                                                    ]}
                                                    >
                                                        <Text style={[isDarkMode? styles.textDark : styles.textLight, styles.textNormal]}>
                                                            {task.title}
                                                        </Text>
                                                        <Text style={[isDarkMode? styles.textDark : styles.textLight, styles.textXS]}>
                                                            fällig am {new Date(task.dueDate).toLocaleDateString('de-DE')}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={[styles.taskLowerContainerEditNotActive]}
                                                >
                                                        <Text style={[styles.textSmall, isDarkMode? styles.textDark : styles.textLight]}>
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
        header: {
            fontSize: SIZES.SCREEN_HEADER,
            fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
            paddingBottom: 5,
        },
        tasksContainer: {
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
        taskUpperContainerEditNotActive: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            padding: 10
        },
        taskLowerContainerEditNotActive: {
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
        taskTitleDateColumn: {
            alignItems: "flex-end",
            rowGap: 5
        },
    })
}