import {View, StyleSheet, TouchableOpacity} from "react-native";

function ColorPickerButtons({color, onPress}){
    const containerStyle = {
        ...styles.colorBox,
        backgroundColor: color, // Verwendung der Prop für die Hintergrundfarbe
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={containerStyle}>
            </View>
        </TouchableOpacity>
    )
}

export default ColorPickerButtons;

const styles = StyleSheet.create({
    colorBox: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35,
        width: 35,
        height: 35,
    }
})