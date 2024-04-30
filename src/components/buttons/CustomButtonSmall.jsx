import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {COLOR, SIZES} from "../../constants/styleSettings";


/**
 * ## CustomButtonSmall Component
 *
 * Renders a small custom button designed according to the app's button styling guidelines.
 * A title and onPress function can be specified.
 *
 * @param title - The text displayed on the button.
 * @param onPressFunction - Function to be called when the button is pressed.
 *
 * @example
 * ```jsx
 * //this example illustrates how the button is used to close the editing mode for tasklists in TasksMain:
 * <CustomButtonSmall title={"Fertig"} onPressFunction={handleCloseEditTaskLists}/>
 * ```
 */
function CustomButtonSmall({title, onPressFunction}){
    return (
        <TouchableOpacity onPress={onPressFunction} style={styles.buttonStyle}>
            <Text style={styles.buttonLabel}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButtonSmall;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: COLOR.BUTTONCOLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        justifyContent: "center",
        height: 30,
        width: 65
    },
    buttonLabel: {
        color: COLOR.BUTTONLABEL,
        fontSize: SIZES.BUTTON_SMALL_LABEL_SIZE,
        textAlign: "center",
    }
})