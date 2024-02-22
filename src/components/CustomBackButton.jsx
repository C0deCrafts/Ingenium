import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {ICONS as ICON} from "../constants/icons";
import Icon from "./Icon";
import {COLOR, SIZES} from "../constants/styleSettings";

function CustomBackButton({onPress}) {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.titleContainer} onPress={onPress}>
                <Icon name={ICON.BACK.ACTIVE}
                      size={SIZES.BACK_BUTTON_ICON_SIZE}
                      color={COLOR.ICONCOLOR}
                />
                <View>
                    <Text style={styles.headerTitle}>Zurück</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CustomBackButton;

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        paddingTop: SIZES.PADDING_TOP_BACK_HEADER_FROM_SAFEAREAVIEW
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: SIZES.BACK_HEADER_FONTSIZE,
        color: COLOR.DRAWER_HEADER_LABEL_COLOR,
        marginLeft: 5,
    }

})