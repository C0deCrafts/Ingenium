



import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "../Icon";
import {ICONS} from "../../constants/icons";
import {COLOR} from "../../constants/styleSettings";


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
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: COLOR.BUTTONCOLOR,
        justifyContent: "center",
        alignItems: "center",
    }
});