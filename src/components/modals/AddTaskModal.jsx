import {View, StyleSheet, Modal, TouchableOpacity} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CustomButton from "../buttons/CustomButton";
import Icon from "../Icon";
import {ICONS} from "../../constants/icons";
import {COLOR, SIZES} from "../../constants/styleSettings";
import RoundButton from "../buttons/RoundButton";

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

    return (
            <Modal
                visible={visible}
                animationType={"slide"}
            >
                <View style={styles.contentContainer}>
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
        contentContainer: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
            /*insets + 80 because this is the height of BottomTabBar which
            is not visible in this component, but it's height needs
            to be taken into account*/
            paddingBottom: insets.bottom + 80,
            paddingTop: insets.top,
        },
        buttonContainer: {
            rowGap: 25,
            width: '50%',
        },
        roundButtonPosition: {
            alignSelf: "center"
        }
    });
}