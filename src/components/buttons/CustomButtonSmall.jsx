import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {COLOR, SIZES} from "../../constants/styleSettings";

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