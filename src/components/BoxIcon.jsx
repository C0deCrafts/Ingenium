import {View, StyleSheet } from "react-native";
import Icon from "./Icon";
import {SIZES} from "../constants/styleSettings";

function BoxIcon({name, color, backgroundColor }){
    const containerStyle = {
        ...styles.iconBox,
        backgroundColor: backgroundColor, // Verwendung der Prop für die Hintergrundfarbe
    };

    return (
        <View style={containerStyle}>
            <Icon name={name} color={color} size={25}/>
        </View>
    )
}

export default BoxIcon;

const styles = StyleSheet.create({
    iconBox: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.BORDER_RADIUS,
        width: 35,
        height: 35
    }
})