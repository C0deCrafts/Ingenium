import {View, StyleSheet, Modal, TouchableOpacity} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomButton from "../buttons/CustomButton";
import Icon from "../Icon";
import {ICONS} from "../../constants/icons";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";

/**
 * ### AddTaskModal Component
 * A fullScreen Modal View which displays Buttons for creating a Task 'Neue Aufgabe'
 * and a List 'Neue Liste'.
 * As well as a button for closing the Modal.
 *
 * The Modal takes following parameters:
 * @param onPressCloseModal {function}  handles the press of Modals round 'Close' Button
 * @param onPressCreateTask {function}  handles the press of Modals 'Neue Aufgabe' Button
 * @param onPressCreateList {function}  handles the press of Modals 'Neue Liste' Button
 * @param visible {boolean} a boolean value which handles the visibility of the Modal
 * @returns {JSX.Element}
 * @constructor
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
                        <TouchableOpacity
                            onPress={onPressCloseModal}
                            style={styles.roundButton}
                        >
                            <Icon name={ICONS.TASKICONS.CLOSE} size={20} color={COLOR.BUTTONLABEL}/>
                        </TouchableOpacity>
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
        roundButton: {
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: COLOR.BUTTONCOLOR,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
        },
    });
}