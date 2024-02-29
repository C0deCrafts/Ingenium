import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useTheme} from "../../constants/context/ThemeContext";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import CustomInputField from "../../components/inputFields/CustomInputField";
import {ICONS} from "../../constants/icons";
import BoxIcon from "../../components/BoxIcon";
import {USER_COLORS, USER_ICONS} from "../../constants/customizationSettings";
import ColorPickerButtons from "../../components/buttons/ColorPickerButtons";
import {useState} from "react";
import CustomButton from "../../components/buttons/CustomButton";

//ACHTUNG: Hier wäre optional super, wenn wir keinen Speichern und Abbrechen Button benötigen würden
//und das stattdessen mit der Tastatur lösen könnten - leider ist das bis jetzt noch nicht möglich

/**
 * CreateList component for creating a new list.
 *
 * @param {object} navigation - Navigation prop object.
 * @returns {JSX.Element} - JSX element representing the CreateList component.
 */
function CreateList({navigation}) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    // State variables for icon box color and icon name
    const [iconBoxColor, setIconBoxColor] = useState(USER_COLORS.ICONCOLOR_CUSTOM_BLUE);
    const [iconName, setIconName] = useState(USER_ICONS.LIST);
    const [listName, setListName] = useState('');

    /*
    * Extract icon names and user colors from constants:
    * In JavaScript, we can iterate directly over arrays using map(),
    * but not over objects. So, if we want to iterate over the elements of an
    * object, we need to first convert the keys of that object into an array.
    * We do this with Object.keys(). This gives us an array of keys of the object,
    * which we can then iterate over using map(). This allows us to access
    * each element of the object and use it as we want.
    */
    const iconNames = Object.keys(USER_ICONS);
    const userColors = Object.keys(USER_COLORS);

    const handleChangeIcon = (name) => {
        setIconName(name);
    }
    const handleChangeIconBoxColor = (color) => {
        setIconBoxColor(color);
    }
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            {/* Custom back button */}
            <CustomBackButton onPress={handleGoBack}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                {/* Header */}
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                    Neue Liste erstellen
                </Text>
                {/* Spacing */}
                <View style={styles.spacing}>
                    {/* Input field for list name */}
                    <CustomInputField placeholder={"Listenname"}
                                      keyboardType={"default"}
                                      maxTextInputLength={25}
                                      iconName={iconName}
                                      iconBoxBackgroundColor={iconBoxColor}
                                      iconColor={"white"}
                                      onChangeText={(listName) => setListName(listName)}
                                      value={listName}
                    />
                </View>
                {/* Icon selection */}
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                    Icon
                </Text>
                <View style={styles.spacing}>
                    {/* Horizontal scroll view for icon selection */}
                    <ScrollView horizontal={true}
                                style={isDarkMode ? styles.scrollContainerDark : styles.scrollContainerLight}
                                showsHorizontalScrollIndicator={false} bounces={true}>
                        {iconNames.map((iconName) => (
                            <TouchableOpacity key={iconName} onPress={() => handleChangeIcon(USER_ICONS[iconName])}>
                                <View key={iconName} style={styles.boxSpacing}>
                                    <BoxIcon
                                        name={ICONS.TASKICONS[iconName]}
                                        color={"white"}
                                        backgroundColor={iconBoxColor}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                        {/* Spacer for the last icon button */}
                        <View style={{width: 15, height: '100%'}}></View>
                    </ScrollView>
                </View>
                {/* Color selection */}
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                    Farbe
                </Text>
                <View style={styles.spacing}>
                    {/* Horizontal scroll view for color selection */}
                    <ScrollView horizontal={true}
                                style={isDarkMode ? styles.scrollContainerDark : styles.scrollContainerLight}
                                showsHorizontalScrollIndicator={false} bounces={true}>
                        {/* Map through user colors */}
                        {userColors.map((userColor) => (
                            <View key={userColor} style={styles.boxSpacing}>
                                {/* Display color picker button */}
                                <ColorPickerButtons
                                    color={USER_COLORS[userColor]}
                                    onPress={() => handleChangeIconBoxColor(USER_COLORS[userColor])}
                                />
                            </View>
                        ))}
                        {/* Spacer for the last color picker button */}
                        <View style={{width: 15, height: '100%'}}></View>
                    </ScrollView>
                </View>
                {/* Optional buttons for saving and canceling */}
                <View style={styles.buttonBox}>
                    <View style={styles.buttonOne}>
                        <CustomButton title={"Speichern"} onPressFunction={() => console.log("Speichern der Liste: " + listName + " gedrückt")}/>
                    </View>
                    <View style={styles.buttonTwo}>
                        <CustomButton title={"Abbrechen"} onPressFunction={() => handleGoBack()}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CreateList;

const styles = StyleSheet.create({
    // Container styles for light and dark mode
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    // Content styles for light and dark mode
    contentLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER
    },
    contentDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER
    },
    // Header text styles
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        paddingBottom: 5,
    },
    // Text styles for light and dark mode
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
    // Spacing between elements
    spacing: {
        marginVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
    // Styles for the horizontal scroll container in light and dark mode
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
    // Button container styles
    buttonBox: {
        flexDirection: "row",
        marginTop: 40
    },
    // Save button styles
    buttonOne: {
        flex: 1,
        marginRight: 10,
        height: 50,
    },
    // Cancel button styles
    buttonTwo: {
        flex: 1,
        height: 50,
        marginLeft: 10
    }
})