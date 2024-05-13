import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {COLOR, SIZES} from "../../constants/styleSettings";

/**
 * ### CustomButton Component
 *
 * This component represents a custom button with a specified title and onPress function.
 * It allows users to interact with the button by pressing it.
 *
 * @param {string} title - The text displayed on the button.
 * @param {function} onPressFunction - Function to be called when the button is pressed.
 *
 * @example
 * // Inside your component's render method, use the CustomButton component like this:
 * <CustomButton title={"Login"} onPressFunction={()=> console.log("Pressed")}/>
 */
function CustomButton({title, onPressFunction}){
    return (
            <TouchableOpacity onPress={onPressFunction} style={styles.buttonStyle}>
                <Text style={styles.buttonLabel}>{title}</Text>
            </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: COLOR.BUTTONCOLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        justifyContent: "center",
        height: 50,
    },
    buttonLabel: {
        color: COLOR.BUTTONLABEL,
        fontSize: SIZES.BUTTON_LABEL_SIZE,
        fontWeight: SIZES.BUTTON_LABEL_WEIGHT,
        textAlign: "center",
    }
})