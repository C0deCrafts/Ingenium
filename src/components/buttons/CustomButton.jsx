import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {COLOR, SIZES} from "../../constants/styleSettings";

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
        marginHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
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