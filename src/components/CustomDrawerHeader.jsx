import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import {ICONS} from "../constants/icons";
import {COLOR, SIZES} from "../constants/styleSettings";

function CustomDrawerHeader({title, onPress}){
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onPress}>
                <Icon name={ICONS.DRAWER_MENU.ACTIVE}
                      size={SIZES.DRAWER_BUTTON_ICON_SIZE}
                      color={COLOR.ICONCOLOR}
                />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
        </View>
    )
}

export default CustomDrawerHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        paddingTop: SIZES.PADDING_TOP_DRAWER_HEADER_FROM_SAFEAREAVIEW,
    },
    titleContainer: {
        flex: 1,
        alignItems: "flex-end"
    },
    headerTitle: {
        fontSize: SIZES.DRAWER_HEADER_FONTSIZE,
        fontWeight: SIZES.DRAWER_HEADER_FONTWEIGHT,
        color: COLOR.DRAWER_HEADER_LABEL_COLOR,
    }
})