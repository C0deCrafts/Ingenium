import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useTheme} from "../../context/ThemeContext";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {useDatabase} from "../../context/DatabaseContext";
import TaskTitleDateElement from "../../components/taskComponents/TaskTitleDateElement";

function CompletedTasks({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);

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
                        */

                            tasksDone.map((task, index) => {
                                return (
                                    <View key={task.taskId}>
                                        {/*render a TaskTitleElement for each task*/}
                                        <TaskTitleDateElement
                                        p_taskId={task.taskId}
                                        p_taskIsDone={task.isDone}
                                        taskTitle={task.taskTitle}
                                        isTaskTitlePreview={false}
                                        showDate={true}
                                        dateText={"Erledigt am ..."}
                                        taskIsInCompletedScreen={true}
                                        />
                                        {/* Adds a border, except after the last element */}
                                        {index !== tasksDone.length - 1 && (
                                            <View style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                        )}
                                    </View>
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
        opaqueLight: {
            color: LIGHTMODE.TEXT_COLOR_OPAQUE,
        },
        opaqueDark: {
            color: DARKMODE.TEXT_COLOR_OPAQUE,
        },
        headerHeading: {
            fontSize: SIZES.DRAWER_HEADER_FONTSIZE,
            fontWeight: SIZES.DRAWER_HEADER_FONTWEIGHT,
        },
        scrollViewContentContainer: {
            paddingHorizontal: 10,
            paddingVertical: 10,
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