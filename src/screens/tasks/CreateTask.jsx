import {Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Keyboard} from "react-native";
import {useTheme} from "../../constants/context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/CustomBackButton";
import CustomButton from "../../components/CustomButton";
import {useState} from "react";
import CustomBoxButton from "../../components/CustomBoxButton";
import {ICONS} from "../../constants/icons";
function CreateList({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');

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
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButton onPress={handleGoBack}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                    Aufgabe hinzufügen
                </Text>

                <View style={styles.spacing}></View>
                    <View style={styles.textInputBoxes}>
                        <View style={[isDarkMode ? styles.textInputBoxDark : styles.textInputBoxLight, styles.border]}>
                            <TextInput
                                placeholder={"Titel"}
                                style={isDarkMode ? styles.inputDark : styles.inputLight}
                                selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                                onChangeText={(text) => setTitle(text)}
                            />
                        </View>
                        <View style={isDarkMode ? styles.textInputBoxNotesDark : styles.textInputBoxNotesLight}>
                            <TextInput placeholder={"Notizen"}
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
                        buttonTextRight={"Ingenium"}
                        iconBoxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_BLUE}
                        iconName={ICONS.TASKICONS.LIST}
                        iconColor={COLOR.BUTTONLABEL}
                        onPress={navigateToEditTaskDetails}
                    />
                    <View style={styles.spacing}></View>
                    <CustomBoxButton
                        buttonTextLeft={"Details"}
                        buttonTextRight={""}
                        iconBoxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_BLUE}
                        iconName={ICONS.TASKICONS.CURVED_LINE}
                        iconColor={COLOR.BUTTONLABEL}
                        onPress={navigateToEditTaskDetails}
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
        </View>
    )
}

export default CreateList;

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
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
    textInputBoxes: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
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
    border: {
        borderBottomWidth: 1,
        borderColor: LIGHTMODE.BACKGROUNDCOLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    inputLight: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: LIGHTMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        //paddingLeft: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    inputDark: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: DARKMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        //paddingLeft: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    inputLightNotes: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: LIGHTMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        height: 100,
        //paddingLeft: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    inputDarkNotes: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: DARKMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        height: 100,
        //paddingLeft: SIZES.SPACING_HORIZONTAL_DEFAULT
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