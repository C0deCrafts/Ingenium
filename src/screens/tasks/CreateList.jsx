import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useTheme} from "../../constants/context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/CustomBackButton";
import CustomInputField from "../../components/CustomInputField";
import {ICONS} from "../../constants/icons";
import BoxIcon from "../../components/BoxIcon";
import {USER_COLORS, USER_ICONS} from "../../constants/customizationSettings";
import ColorPickerButtons from "../../components/ColorPickerButtons";
import {useState} from "react";
import CustomButton from "../../components/CustomButton";
function CreateList({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;
    const iconNames = Object.keys(USER_ICONS);
    const userColors = Object.keys(USER_COLORS);

    const [iconBoxColor, setIconBoxColor] = useState(COLOR.ICONCOLOR_CUSTOM_BLUE);
    const [iconName, setIconName] = useState(USER_ICONS.LIST);

    const handleChangeIcon = (name) => {
        setIconName(name);
    }
    const handleChangeIconBoxColor = (color) => {
        setIconBoxColor(color);
    }

    const handleGoBack = () => {
        navigation.goBack(); // goBack() aufrufen, wenn der Button gedrückt wird
    };

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButton onPress={handleGoBack}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                    Neue Liste erstellen
                </Text>
                <View style={styles.spacing}>
                    <CustomInputField placeholder={"Listenname"}
                                      keyboardType={"default"}
                                      maxTextInputLength={25}
                                      iconName={iconName}
                                      iconBoxBackgroundColor={iconBoxColor}
                                      iconColor={"white"}
                    />
                </View>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                    Icon
                </Text>
                <View style={styles.spacing}>
                <ScrollView horizontal={true} style={isDarkMode ? styles.scrollContainerDark : styles.scrollContainerLight} showsHorizontalScrollIndicator={false} bounces={true}>
                    {iconNames.map((iconName) => (
                        <TouchableOpacity key={iconName} onPress={()=>handleChangeIcon(USER_ICONS[iconName])}>
                            <View key={iconName} style={styles.boxSpacing}>
                                <BoxIcon
                                    name={ICONS.TASKICONS[iconName]}
                                    color={"white"}
                                    backgroundColor={iconBoxColor}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                    {/* Abstandshalter für letzten Button */}
                    <View style={{ width: 15, height: '100%' }}></View>
                </ScrollView>
                </View>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                    Farbe
                </Text>
                <View style={styles.spacing}>
                    <ScrollView horizontal={true} style={isDarkMode ? styles.scrollContainerDark : styles.scrollContainerLight} showsHorizontalScrollIndicator={false} bounces={true}>
                        {userColors.map((userColor) => (
                            <View key={userColor} style={styles.boxSpacing}>
                                <ColorPickerButtons
                                    color={USER_COLORS[userColor]}
                                    onPress={()=>handleChangeIconBoxColor(USER_COLORS[userColor])}
                                />
                            </View>
                        ))}
                        {/* Abstandshalter für letzten Button */}
                        <View style={{ width: 15, height: '100%' }}></View>
                    </ScrollView>
                </View>
                <View style={styles.buttonBox}>
                    <View  style={styles.buttonOne}>
                        <CustomButton title={"Speichern"} onPressFunction={()=> console.log("Speichern gedrückt")}/>
                    </View>
                    <View  style={styles.buttonTwo}>
                        <CustomButton title={"Abbrechen"} onPressFunction={()=> handleGoBack()}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CreateList;

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR
    },
    contentLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER
    },
    contentDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER
    },
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        paddingBottom: 5,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    boxSpacing: {
        marginRight: 15,
    },
    spacing: {
        marginVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
    scrollContainerLight: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        padding: 15
    },
    scrollContainerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        padding: 15
    },
    buttonBox: {
        flexDirection: "row",
        marginTop: 40
    },
    buttonOne: {
        flex: 1,
        marginRight: 10,
        height: 50,
    },
    buttonTwo: {
        flex: 1,
        height: 50,
        marginLeft: 10
    }
})