import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useEffect, useRef, useState} from "react";
import {useDatabase} from "../../context/DatabaseContext";
import ToggleDoneIcon from "./ToggleDoneIcon";

/**
 *
 * @param p_taskId The id of the displayed task, which is passed to the component to be used in the updateTaskIsDone function.
 * @param p_taskIsDone The isDone property of the displayed task, which is passed, so it can be toggled - to be used in the updateTaskIsDone function.
 * @param taskTitle The title of the task which will be displayed.
 * @param isTaskTitlePreview {boolean} Option true: title and date are aligned to the left and letters in title exceeding the
 *                                   length of the container are displayed with tailing: '...'.
 *                                   Option false: title and date are aligned to the right and the whole task title is visible.
 * @param showDate {boolean} Flag which controls whether a due date or completion date is shown.
 * @param dateText For adding the text and date indicating when the task is due / when it was completed.
 *                 Will only be visible if showDate is set to true.
 * @param taskIsInCompletedScreen {boolean} controls the appearance and toggling behaviour of task and toggle buttons.
 *                                          Option true: task appears with filled toggle button, indicating  that it is
 *                                          completed.
 *                                          Option false: task appears with outlined toggle button indicating, that it still
 *                                          needs to be completed.
 * @returns {JSX.Element}
 * @constructor
 */

function TaskTitleDateElement({p_taskId, p_taskIsDone, taskTitle, isTaskTitlePreview, showDate, dateText, taskIsInCompletedScreen}) {
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

       console.log("USEEFFECT was entered");
       const timeOut = () => {
           setTimeout(async () => {
               try {
                   console.log(`The time out is over - task with title ${taskTitle} will now be updated `);
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


    if(!togglingIsActive) {
        return (
            //Icon and title are aligned on the same height when only a preview title is shown
            <View style={[!isTaskTitlePreview && styles.alignCenter, styles.elementContainer]}>
                {/*Toggle Icon*/}
                <TouchableOpacity onPress={handleToggleTask}>
                    {taskIsInCompletedScreen ?
                    <ToggleDoneIcon isDone={true} isActivated={false}/>
                    :
                    <ToggleDoneIcon isDone={false} isActivated={false}/>}
                </TouchableOpacity>

                <View style={[isTaskTitlePreview ? styles.alignStart : styles.alignEnd, styles.textColumn]}
                >
                    {/*Title*/}
                    {
                        isTaskTitlePreview ?
                            <Text
                                numberOfLines={1} ellipsizeMode={"tail"}
                                style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal, styles.textAlignRight]}>
                                {taskTitle}
                            </Text>
                            :
                            <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.textNormal, styles.textAlignRight]}>
                                {taskTitle}
                            </Text>
                    }

                    {/*DateText for displaying when the task is due / when it was completed*/}
                    {showDate &&
                        <Text
                            style={[isDarkMode ? styles.textDark : styles.textLight, styles.textXS, styles.textItalic]}>
                            {dateText}
                        </Text>}
                </View>
            </View>
        );
    }


    if(togglingIsActive) {
        return (
            <View style={[!isTaskTitlePreview && styles.alignCenter, styles.elementContainer]}>
                {/*Toggle Icon*/}
                {taskIsInCompletedScreen ?
                <ToggleDoneIcon isDone={false} isActivated={true}/>
                :
                <ToggleDoneIcon isDone={true} isActivated={true}/>}

                {/*Text indicating that the task is being moved*/}
                <View style={[isTaskTitlePreview ? styles.alignStart : styles.alignEnd, styles.textColumn]}>
                    <Text style={[isDarkMode ? styles.textOpaqueDark : styles.textOpaqueLight, styles.textNormal]}>
                    ...Aufgabe wird verschoben
                    </Text>
                </View>
            </View>
        );
    }

}

export default TaskTitleDateElement;

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
    }
});