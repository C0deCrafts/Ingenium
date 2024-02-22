import {StyleSheet, TextInput, View} from "react-native";
import {COLOR, SIZES} from "../constants/styleSettings";

function CustomInputField({placeholder, keyboardType, maxTextInputLength, isPassword}){
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={isPassword}
                maxLength={maxTextInputLength}
                placeholderTextColor={COLOR.PLACEHOLDER_TEXTCOLOR}
                selectionColor={COLOR.CURSOR_COLOR}
            />
        </View>
    )
}

export default CustomInputField;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.INPUT_BOX_COLOR,
        marginHorizontal: SIZES.DEFAULT_MARGIN_HORIZONTAL_SCREEN,
        borderRadius: SIZES.BORDER_RADIUS,
        borderWidth: SIZES.BORDER_WIDTH,
        borderColor: COLOR.BORDER_COLOR,
        justifyContent: "center",
        height: 50,
    },
    input: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: COLOR.TEXTINPUT_COLOR,
        textAlign: "center",
    }
})