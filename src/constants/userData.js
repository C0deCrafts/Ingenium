import {ICONS} from "./icons";
import {USER_COLORS} from "./customizationSettings";
import {COLOR} from "./styleSettings";

export const testDataSelectList = [
    {
        id: 1,
        buttonTextLeft: "Ingenium",
        iconName: ICONS.TASKICONS.HAT,
        iconBoxBackgroundColor: USER_COLORS.ICONCOLOR_CUSTOM_BLUE,
        iconColor: COLOR.BUTTONLABEL,
        onPress: () => {
            // Aktion für den ersten Button
            console.log("Ingenium Liste ausgewählt")
        }
    },
    {
        id: 2,
        buttonTextLeft: "Meine ToDo's",
        iconName: ICONS.TASKICONS.CONTRACT,
        iconBoxBackgroundColor: USER_COLORS.ICONCOLOR_CUSTOM_CHARCOAL,
        iconColor: COLOR.BUTTONLABEL,
        onPress: () => {
            // Aktion für den ersten Button
            console.log("Meine ToDo's Liste ausgewählt")
        }
    },
    {
        id: 3,
        buttonTextLeft: "Programmieren",
        iconName: ICONS.TASKICONS.CODE,
        iconBoxBackgroundColor: USER_COLORS.ICONCOLOR_CUSTOM_LIGHTGREEN,
        iconColor: COLOR.BUTTONLABEL,
        onPress: () => {
            // Aktion für den ersten Button
            console.log("Programmieren Liste ausgewählt")
        }
    },
    {
        id: 4,
        buttonTextLeft: "Webdevelopment",
        iconName: ICONS.TASKICONS.CODE,
        iconBoxBackgroundColor: USER_COLORS.ICONCOLOR_CUSTOM_CYAN,
        iconColor: COLOR.BUTTONLABEL,
        onPress: () => {
            // Aktion für den ersten Button
            console.log("Webdevelopment Liste ausgewählt")
        }
    },
    {
        id: 5,
        buttonTextLeft: "Diplomarbeit",
        iconName: ICONS.TASKICONS.FOLDER,
        iconBoxBackgroundColor: USER_COLORS.ICONCOLOR_CUSTOM_PINK,
        iconColor: COLOR.BUTTONLABEL,
        onPress: () => {
            // Aktion für den ersten Button
            console.log("Diplomarbeit Liste ausgewählt")
        }
    },
    {
        id: 6,
        buttonTextLeft: "Lernen",
        iconName: ICONS.TASKICONS.HAT,
        iconBoxBackgroundColor: USER_COLORS.ICONCOLOR_CUSTOM_TEAL,
        iconColor: COLOR.BUTTONLABEL,
        onPress: () => {
            // Aktion für den ersten Button
            console.log("Lernen Liste ausgewählt")
        }
    },
    {
        id: 7,
        buttonTextLeft: "Sonstiges",
        iconName: ICONS.TASKICONS.CURVED_LINE,
        iconBoxBackgroundColor: USER_COLORS.ICONCOLOR_CUSTOM_PURPLE,
        iconColor: COLOR.BUTTONLABEL,
        onPress: () => {
            // Aktion für den ersten Button
            console.log("Sonstiges Liste ausgewählt")
        }
    },
]