import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useEffect, useRef, useState} from "react";
import {useDatabase} from "../../context/DatabaseContext";
import ToggleDoneIcon from "./ToggleDoneIcon";

/**
 *## TaskPreview Component
 *
 * This component is used to render a customizable Preview of a task's title with toggle button and due- / completion-date
 * and the notes belonging to a task.
 *
 * Display Options:
 * - It can be controlled whether the whole title or just a preview are shown (prop: isTaskTitlePreview)
 * - It can be controlled whether the date is shown (props: showDate and dateText)
 * - It can be controlled whether:
 *      - the task is displayed as a ContentCard with background (toggleIcon, title, date, notes)
 *      - or only the toggleIcon, title and date are displayed (prop: isTaskCardWithNotes)
 *
 * @param p_taskId The id of the displayed task, which is passed to the component to be used in the updateTaskIsDone function.
 * @param p_taskIsDone The isDone property of the displayed task:
 *                      - controls the appearance of the toggle button (if task is done button is filled, if it is not
 *                      done button is only outlined.
 *                      - For updating the isDone property, it is passed the updateTaskIsDone function as a parameter.
 * @param taskTitle The title of the task which will be displayed.
 * @param taskNotes Thee notes belonging to the displayed task, which will be shown if isTaskCardWithNotes is set to true.
 * @param isTaskTitlePreview {boolean} Option true: title and date are aligned to the left and letters in title exceeding the
 *                                      length of the container are displayed with tailing: '...'.
 *                                     Option false: title and date are aligned to the right and the whole task title is visible.
 * @param showDate {boolean} Flag which controls whether a due date or completion date is shown.
 * @param dateText For adding the text and date indicating when the task is due / when it was completed.
 *                 Will only be visible if showDate is set to true.
 * @param isTaskCardWithNotes {boolean} Option true: The Task is displayed in a Box with border radius and the toggle Icon
 *                             the title the date and the notes are displayed.
 *                            Option false: Only the toggle Icon the title and the date are displayed.
 * @returns {JSX.Element}
 * @constructor
 */

function TaskPreview({p_taskId, p_taskIsDone, taskTitle, taskNotes,
                                  isTaskTitlePreview, showDate, dateText, isTaskCardWithNotes}) {
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {updateTaskIsDone} = useDatabase();

    const [togglingIsActive, setTogglingIsActive] = useState(false);

    //useref to prevent the effect from running on the initial render of the component
    const isInitialRender = useRef(true);

    //effect will execute whenever one of the dependencies changes
    useEffect( () => {

        if(isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

       const timeOut = () => {
           setTimeout(async () => {
               try {
                   console.log(`The time out in Useffect is over - task with title ${taskTitle} will now be updated `);
                   await updateTaskIsDone(p_taskId, p_taskIsDone);
                   setTogglingIsActive(false);
               } catch (e) {
                   console.log("error with update: ",e);
               }

           }, 2000);
       }

        //only start the timeout if the toggling is active, to prevent re-updating a task after an update
        if(togglingIsActive){
            timeOut();
        }


       //cleanup function to prevent memory leaks
       return () => {
           clearTimeout(timeOut);
       };
    //add all props and states the effect depends on to the dependency array
    }, [togglingIsActive, p_taskIsDone, p_taskId]);

    function handleToggleTask() {
        setTogglingIsActive(true);
        console.log("Handle toggle task was pressed");
    }

    /**
     * Renders the correct title:
     * - Normally it shows the title of the task
     * - If the user clicks on the toggle button, it shows '...Aufgabe wird verschoben'
     * @returns {JSX.Element} A text element.
     */
    const showTitleOrUpdate = () => {
        if(togglingIsActive) {
            return (
                <Text style={[isDarkMode ? styles.textOpaqueDark : styles.textOpaqueLight, styles.textNormal]}>
                    ...Aufgabe wird verschoben
                </Text>
            )
        } else {
            return (
                <Text
                    numberOfLines = {isTaskTitlePreview? 1 : undefined}
                    ellipsizeMode={isTaskTitlePreview? "tail" : undefined}
                    style={[
                        isDarkMode ? styles.textDark : styles.textLight,
                        styles.textNormal,
                        !isTaskTitlePreview && styles.textAlignRight
                    ]}>
                    {taskTitle}
                </Text>
            )
        }
    }

    /**
     * Renders the taskContent which is same for all Screens:
     * toggleIcon, title and date
     * @returns {JSX.Element}
     */
    const showTaskContent = () => {
        {/*Icon and title are aligned on the same height when only a preview title is shown
                   If the whole title is shown the Icon is centrally aligned to the title*/}
        return (
            <View style={[
                styles.elementContainer,
                !isTaskTitlePreview && styles.alignCenter
            ]}
            >
                {/*Toggle Icon*/}
                <TouchableOpacity onPress={handleToggleTask}>
                    <ToggleDoneIcon isDone={togglingIsActive ? !p_taskIsDone : p_taskIsDone}
                                    isActivated={togglingIsActive}/>
                </TouchableOpacity>

                <View style={[isTaskTitlePreview ? styles.alignStart : styles.alignEnd, styles.textColumn]}
                >
                    {/*Title*/}
                    {showTitleOrUpdate()}

                    {/*
                    DateText for displaying when the task is due / when it was completed
                    It only is shown when the tasks isDone is currently not being toggled
                    */}
                    {showDate && !togglingIsActive &&
                        <Text
                            style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS, styles.textItalic]}>
                            {dateText}
                        </Text>}
                </View>
            </View>
        )};

    /**
     * The prop isTaskCardWithNotes controls the final JSX returned by the component:
     * - if it is set to false: only the toggleIcon, title and date are shown
     * - if it is set to true: a whole content card with rounded borders and the taskNotes is shown
     */
    return (
            isTaskCardWithNotes ? (
                <View style={isDarkMode? styles.taskBoxDark : styles.taskBoxLight}>
                    {showTaskContent()}
                    <View style={[isDarkMode? styles.borderDark : styles.borderLight, styles.noteBox]}>
                        {!togglingIsActive &&
                            <Text style={[styles.textSmall, isDarkMode ? styles.textDark : styles.textLight]}>
                                {taskNotes}
                            </Text>}
                    </View>
                </View>
            ) :
            (showTaskContent())
    )}

export default TaskPreview;

const styles = StyleSheet.create({

    textLight: {
    color: LIGHTMODE.TEXT_COLOR,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
    },
    textOpaqueLight: {
        color: LIGHTMODE.TEXT_COLOR_OPAQUE,
    },
    textOpaqueDark: {
        color: DARKMODE.TEXT_COLOR_OPAQUE,
    },
    textNormal: {
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textXS: {
        fontSize: SIZES.SCREEN_TEXT_XS,
    },
    textAlignRight: {
        textAlign: "right"
    },
    textItalic: {
        fontStyle: "italic"
    },
    alignStart: {
        alignItems: "flex-start"
    },
    alignEnd: {
        alignItems: "flex-end"
    },
    alignCenter: {
        alignItems: "center"
    },
    textColumn: {
        rowGap: SIZES.SPACING_VERTICAL_SMALL,
        flex: 1,
    },
    elementContainer: {
        //aligns Icon and TitleDate in a row
        flexDirection: "row",
        //needed for gap between title and Icon
        columnGap: SIZES.SPACING_HORIZONTAL_DEFAULT - 5,
        //padding around the element
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    /*Styling for displaying a Card with notes*/
    taskBoxLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
    },
    taskBoxDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
    },
    noteBox: {
        alignItems: "flex-start",
        padding: 10,
        borderTopWidth: 1,
    },
    borderLight: {
        borderTopColor: LIGHTMODE.BACKGROUNDCOLOR,
    },
    borderDark: {
        borderTopColor: DARKMODE.BACKGROUNDCOLOR,
    }

});