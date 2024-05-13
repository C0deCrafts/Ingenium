import {StyleSheet, TouchableOpacity} from "react-native";
import Icon from "../Icon";
import {COLOR} from "../../constants/styleSettings";

/**
 * ### RoundButton Component
 * The component renders a round button in the App's main button color, with an Icon in its center.
 *
 * @param {function} onPress - Function to be called when the button is pressed.
 * @param {object} buttonStyle - Optional style object which can be used to style the button further / position it where
 *                                  needed.
 * @param {string | Object} iconName - Name of the Icon to be displayed in the button. For this prop a constant listed in the
 *                   'icons.js' file should be used.
 *
 * @example
 * ```jsx
 * <RoundButton
 *   onPress={onPressCloseModal}
 *   buttonStyle={styles.roundButtonPosition}
 *   iconName={ICONS.TASKICONS.CLOSE}
 * />
 * ```
 */
function RoundButton({onPress, buttonStyle, iconName}) {
    return (
        <TouchableOpacity
            style={[styles.roundButton, buttonStyle]}
            onPress={onPress}
        >
            <Icon name={iconName} size={35} color={COLOR.BUTTONLABEL}/>
        </TouchableOpacity>
    );
}

export default RoundButton;

const styles = StyleSheet.create({
    roundButton: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: COLOR.BUTTONCOLOR,
        justifyContent: "center",
        alignItems: "center",
    }
});