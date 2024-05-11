import {Text, View, StyleSheet, ScrollView} from "react-native";
import {useTheme} from "../../context/ThemeContext";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {useDatabase} from "../../context/DatabaseContext";
import TaskPreview from "../../components/taskComponents/TaskPreview";
import {formatDate, groupTasksByCompletionDate} from "../../utils/utils";

function CompletedTasks({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {tasks} = useDatabase();

    /**
     * Is called on press of the Back Button.
     * Navigates back to the TasksMain Screen.
     */
    const handleGoBack = () => {
        navigation.goBack();
    };

    //filter tasks to show tasks belonging to currentList && isDone is false
    const tasksDone = tasks.filter(task => task.isDone);
    const groupedTasks = groupTasksByCompletionDate(tasksDone);

    const groupTitles = {
        today: "Heute",
        yesterday: "Gestern",
        dayBeforeYesterday: "Vorgestern",
        thisMonth: "Dieses Monat",
        expiringSoon: "Bald auslaufend"
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
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {/* shows tasks of all taskLists which have the property done === true */
                        Object.keys(groupedTasks).map(group => (
                                groupedTasks[group].length > 0 && (
                                    <View key={group}>
                                        <View>
                                            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>{groupTitles[group]}</Text>
                                        </View>
                                        <View style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}>
                                            {groupedTasks[group].map((task, index) => (
                                                <View key={task.taskId}
                                                >
                                                    {/*render a TaskTitleElement for each task*/}
                                                    <TaskPreview
                                                        p_taskId={task.taskId}
                                                        p_taskIsDone={task.isDone}
                                                        taskTitle={task.taskTitle}
                                                        isTaskTitlePreview={false}
                                                        showDate={true}
                                                        dateText={`Erledigt am ${formatDate(task.doneDate)}`}
                                                        taskIsInCompletedScreen={true}
                                                    />
                                                    {/* Adds a border, except after the last element */}
                                                    {index !== groupedTasks[group].length - 1 && (
                                                        <View style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                                    )}
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )
                            ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default CompletedTasks;

const styles = StyleSheet.create({
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
            marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER,
            flex: 1,
            rowGap: SIZES.SPACING_VERTICAL_DEFAULT,
        },
        contentBoxLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        contentBoxDark: {
            backgroundColor: DARKMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        header: {
            fontSize: SIZES.SCREEN_HEADER,
            paddingVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES
        },
        instructionBox: {
        paddingHorizontal: 10,
            paddingVertical: 12,
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