import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useTheme} from "../../constants/context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import {useTasks} from "../../constants/context/TasksContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomBackButton from "../../components/buttons/CustomBackButton";

function CompletedTasks({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

    const {taskListsState, dispatch} = useTasks();

    /**
     * Is called on Press of the round Button next to a task in the taskslist
     * will toggle the property done of a task
     * and the task will disappear from the taskslist in the UI as it only shows tasks
     * which are done
     * @param taskId the id of the task which was pressed
     */
    function handleTaskNotCompleted(taskId) {
        console.log("INSIDE HANDLETASKNOTCOMPLETED: Task not completed was pressed on task with id: ", taskId);
        dispatch({
            type: 'TOGGLED_TASK_DONE',
            taskId: taskId,
        })
    }

    /**
     * Is called on press of the Back Button.
     * Navigates back to the TasksMain Screen.
     */
    const handleGoBack = () => {
        navigation.goBack();
    };

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
                        ordered by date ascending
                        */
                        [...taskListsState]
                            .flatMap(list => list.tasks)
                            .filter(task => task.done)
                            .sort((t1, t2) => new Date(t1.dueDate) - new Date(t2.dueDate))
                            .map(task => {
                                return (
                                    <TouchableOpacity
                                        key={task.id}
                                        style={[isDarkMode ? styles.listItemContainerDark : styles.listItemContainerLight, styles.listItemContainer]}
                                        onPress={() => handleTaskNotCompleted(task.id)}
                                    >
                                        <View><Icon name={ICONS.TASKICONS.CIRCLE_DONE}
                                                 color={isDarkMode ? COLOR.BUTTONLABEL : COLOR.ICONCOLOR_CUSTOM_BLACK}
                                                 size={20}/></View>
                                        <View style={styles.taskTitleDateColumn}>
                                            <Text
                                                style={[
                                                    isDarkMode ? styles.textDark : styles.textLight,
                                                    styles.textNormal,
                                                    styles.textAlignRight
                                                ]}>
                                                {task.title}
                                            </Text>
                                            <Text style={[
                                                isDarkMode ? styles.textDark : styles.textLight,
                                                styles.textXS,
                                                styles.dueDate,
                                                styles.textItalic
                                            ]}>
                                                Erledigt: ... (Logik implementieren)
                                            </Text>
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