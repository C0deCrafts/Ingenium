import {Text, View, StyleSheet, TextInput, Keyboard} from "react-native";
import {useTheme} from "../../constants/context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import CustomButton from "../../components/buttons/CustomButton";
import {useRef, useState} from "react";
import CustomBoxButton from "../../components/buttons/CustomBoxButton";
import {ICONS} from "../../constants/icons";
import SelectListModal from "../../components/modals/SelectListModal";

function CreateList({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const bottomSheetRef = useRef(null);

    const handlePresentModalPress = () => bottomSheetRef.current?.present();

    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedList, setSelectedList] = useState("Ingenium"); // Beispielinitialisierung

    const handleListSelection = (buttonTextLeft) => {
        setSelectedList(buttonTextLeft);
        console.log("listname: " + buttonTextLeft)
        bottomSheetRef.current?.dismiss(); // Schließt das Modal
    };

    const navigateToEditTaskDetails = () => {
        Keyboard.dismiss(); // Schließt die Tastatur
        navigation.navigate("EditTaskDetails_Screen", {
            title: title, // Übergabe des Titels
            notes: notes, // Übergabe der Notizen
        });
    };
    const handleGoBack = () => {
        navigation.goBack(); // goBack() aufrufen, wenn der Button gedrückt wird
    };

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButton onPress={handleGoBack}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                    Aufgabe hinzufügen
                </Text>

                <View style={styles.spacing}></View>
                    <View style={isDarkMode ? styles.textInputBoxesDark : styles.textInputBoxesLight}>
                        <View style={[isDarkMode ? styles.textInputBoxDark : styles.textInputBoxLight,
                                      isDarkMode ? styles.borderDark : styles.borderLight]}>
                            <TextInput
                                placeholder={"Titel"}
                                placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                                style={isDarkMode ? styles.inputDark : styles.inputLight}
                                selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                                onChangeText={(text) => setTitle(text)}
                            />
                        </View>
                        <View style={isDarkMode ? styles.textInputBoxNotesDark : styles.textInputBoxNotesLight}>
                            <TextInput placeholder={"Notizen"}
                                       placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                                       style={isDarkMode ? styles.inputDarkNotes : styles.inputLightNotes}
                                       selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                                       maxLength={1000}
                                       multiline={true}
                                       scrollEnabled={true}
                                       onChangeText={(notes) => setNotes(notes)}
                                       value={notes}
                            />
                        </View>
                    </View>

                <View style={styles.spacing}></View>
                <View>
                    <CustomBoxButton
                        buttonTextLeft={"Liste"}
                        buttonTextRight={selectedList}
                        iconBoxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_BLUE}
                        iconName={ICONS.TASKICONS.LIST}
                        iconColor={COLOR.BUTTONLABEL}
                        onPress={handlePresentModalPress}
                        showForwardIcon={true}
                        extraPadding={10}
                    />
                    <View style={styles.spacing}></View>
                    <CustomBoxButton
                        buttonTextLeft={"Details"}
                        buttonTextRight={""}
                        iconBoxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_BLUE}
                        iconName={ICONS.TASKICONS.CURVED_LINE}
                        iconColor={COLOR.BUTTONLABEL}
                        onPress={navigateToEditTaskDetails}
                        showForwardIcon={true}
                        extraPadding={10}
                    />
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
            <SelectListModal
                ref={bottomSheetRef}
                onSelect={handleListSelection} // Prop für die Callback-Funktion
            />
        </View>
    )
}

export default CreateList;

const styles = StyleSheet.create({
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
    spacing: {
        marginVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
    textInputBoxesLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS
    },
    textInputBoxesDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS
    },
    textInputBoxLight: {
        paddingVertical: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    textInputBoxDark: {
        paddingVertical: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    textInputBoxNotesLight: {
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    textInputBoxNotesDark: {
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    borderLight: {
        borderBottomWidth: 1,
        borderColor: LIGHTMODE.BACKGROUNDCOLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    borderDark: {
        borderBottomWidth: 1,
        borderColor: DARKMODE.BACKGROUNDCOLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    inputLight: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: LIGHTMODE.TEXTINPUT_COLOR,
        textAlign: "left",
    },
    inputDark: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: DARKMODE.TEXTINPUT_COLOR,
        textAlign: "left",
    },
    inputLightNotes: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: LIGHTMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        height: 100,
    },
    inputDarkNotes: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: DARKMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        height: 100,
    },
    boxSpacing: {
        marginRight: 15,
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