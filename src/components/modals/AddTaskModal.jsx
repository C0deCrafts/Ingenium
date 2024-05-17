import {View, StyleSheet, Modal} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomButton from "../buttons/CustomButton";
import {ICONS} from "../../constants/icons";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import RoundButton from "../buttons/RoundButton";

/**
 * ### AddTaskModal Component
 *
 * A fullScreen Modal View which displays Buttons for creating a Task 'Neue Aufgabe'
 * and a List 'Neue Liste' using the 'CustomButton' component.
 * As well as a button for closing the Modal using the 'RoundButton' component.
 *
 * @param onPressCloseModal {Function} - Handles the press of Modals round 'Close' Button.
 * @param onPressCreateTask {Function} - Handles the press of Modals 'Neue Aufgabe' Button.
 * @param onPressCreateList {Function} - Handles the press of Modals 'Neue Liste' Button.
 * @param visible {boolean} - A boolean value which handles the visibility of the Modal.
 *
 * @example
 * // Import the AddTaskModal component
 * import AddTaskModal from "../../components/modals/AddTaskModal";
 *
 * // Inside your component's render method, use the AddTaskModal component like this:
 * <AddTaskModal
 *                         visible={true/false}
 *                         onPressCreateList={handleCreateList}
 *                         onPressCreateTask={handleCreateTask}
 *                         onPressCloseModal={handleCloseModal}
 */
function AddTaskModal({onPressCloseModal, onPressCreateTask, onPressCreateList, visible}) {
    //providing a safe area
    const insets = useSafeAreaInsets();
    const styles = getStyles(insets);
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    return (
            <Modal
                visible={visible}
                animationType={"slide"}
                transparent={true}
            >
                <View style={isDarkMode ? styles.contentContainerDark : styles.contentContainerLight}>
                    <View style={styles.buttonContainer}>
                        <CustomButton title={"Neue Liste"} onPressFunction={onPressCreateList}/>
                        <CustomButton title={"Neue Aufgabe"} onPressFunction={onPressCreateTask}/>
                        <RoundButton
                            onPress={onPressCloseModal}
                            buttonStyle={styles.roundButtonPosition}
                            iconName={ICONS.TASKICONS.CLOSE}
                        />
                    </View>
                </View>
            </Modal>

    );
}

export default AddTaskModal;

function getStyles(insets) {
    return StyleSheet.create({
        contentContainerLight: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
            /*insets + 80 because this is the height of BottomTabBar which
            is not visible in this component, but it's height needs
            to be taken into account*/
            paddingBottom: insets.bottom + 80,
            paddingTop: insets.top,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR_TRANSPARENT,
        },
        contentContainerDark: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
            /*insets + 80 because this is the height of BottomTabBar which
            is not visible in this component, but it's height needs
            to be taken into account*/
            paddingBottom: insets.bottom + 80,
            paddingTop: insets.top,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR_TRANSPARENT,
        },
        buttonContainer: {
            rowGap: 25,
            width: '50%',
        },
        roundButtonPosition: {
            alignSelf: "center"
        },
    });
}