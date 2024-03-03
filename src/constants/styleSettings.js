import {Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const LIGHTMODE = {
    BACKGROUNDCOLOR_OLD: "#F9F9F9",
    BACKGROUNDCOLOR: "#F2F2F2",
    BACKGROUNDCOLOR_TRANSPARENT: "rgba(242 242 242 / 0.96)",
    BUTTONCOLOR: "#009FE3",
    BUTTONLABEL: "#FFFFFF",

    BOX_COLOR: "#FFFFFF",

    BORDER_COLOR: "#000000",
    //   BORDER_COLOR: "#F2F2F2", ???

    DRAWER_HEADER_LABEL_COLOR: "#000000",

    ICONCOLOR: "#000000",
    ICONCOLOR_ACTIVE: "#009FE3",
    ICONCOLOR_INACTIVE: "#000000",

    INPUT_BOX_COLOR: "#FFFFFF",

    TEXTINPUT_COLOR: "#000000",
    TEXT_COLOR: "#000000",
    CURSOR_COLOR: "#009FE3",

    PLACEHOLDER_TEXTCOLOR: "rgba(99 108 112 / 0.7)",
}

export const DARKMODE = {
    BACKGROUNDCOLOR_OLD: "#020302",
    BACKGROUNDCOLOR: "#242426",
    BACKGROUNDCOLOR_TRANSPARENT: "rgba(36 36 38 / 0.96)",
    BUTTONCOLOR: "#009FE3",
    BUTTONLABEL: "#FFFFFF",

    BOX_COLOR: "#1C1C1E",

    BORDER_COLOR: "#242426",

    DRAWER_HEADER_LABEL_COLOR: "#FFFFFF",

    ICONCOLOR: "#FFFFFF",
    ICONCOLOR_ACTIVE: "#009FE3",
    ICONCOLOR_INACTIVE: "#FFFFFF",

    INPUT_BOX_COLOR: "#1C1C1E",

    TEXTINPUT_COLOR: "#FFFFFF",
    TEXT_COLOR: "#FFFFFF",
    CURSOR_COLOR: "#009FE3",

    PLACEHOLDER_TEXTCOLOR: "rgba(99 108 112 / 0.7)",
}

export const COLOR = {
    BUTTONCOLOR: "#009FE3",
    BUTTONLABEL: "#FFFFFF",
    ICONCOLOR_CUSTOM_BLUE: "#009FE3",
    ICONCOLOR_CUSTOM_BLUEGREY: "#86A5B2",
    ICONCOLOR_CUSTOM_DARKBLUE: "#1C7195",
    ICONCOLOR_CUSTOM_VIOLET: "#9747FF",
    ICONCOLOR_CUSTOM_PINK: "#FF8AB4",
    ICONCOLOR_CUSTOM_ORANGE: "#FF7A00",
    ICONCOLOR_CUSTOM_RED: "#E30000",
    ICONCOLOR_CUSTOM_LIGHTGREEN: "#9DD622",
    ICONCOLOR_CUSTOM_DARKGREEN: "#1E7808",
    ICONCOLOR_CUSTOM_AQUA: "#41CFBE",
    ICONCOLOR_CUSTOM_GREY: "#646D71",
    ICONCOLOR_CUSTOM_BLACK: "#000000",
}

export const SIZES = {
    BOTTOM_TAB_LABEL_SIZE: 12,
    BOTTOM_TAB_BAR_HEIGHT: 80,

    BACK_BUTTON_ICON_SIZE: 28,
    BACK_BUTTON_LABEL_SIZE: 18,

    CLOSE_BUTTON_ICON_SIZE: 50,

    CONTACT_ICON_SIZE: 25,

    DEFAULT_MARGIN_HORIZONTAL_SCREEN: 20,
    DRAWER_BUTTON_ICON_SIZE: 40,

    DRAWER_ICONS_SIZE: 25,
    DRAWER_LABEL_SIZE: 18,

    BUTTON_LABEL_SIZE: 18,
    BUTTON_SMALL_LABEL_SIZE: 14,
    BUTTON_LABEL_WEIGHT: "600",

    BORDER_RADIUS: 4,
    BORDER_WIDTH: 1,

    TEXTINPUT_SIZE: 18,
    TEXTINPUT_SIZE_TASKS: 25,
    TEXT_SIZE: 18,

    SPACING_HORIZONTAL_DEFAULT: 20,
    SPACING_VERTICAL_DEFAULT: 20,

    PADDING_TOP_DRAWER_HEADER_FROM_SAFEAREAVIEW: 40,
    PADDING_TOP_BACK_HEADER_FROM_SAFEAREAVIEW: 49,

    DRAWER_HEADER_FONTSIZE: 30,
    DRAWER_HEADER_FONTWEIGHT: "700",

    BACK_HEADER_FONTSIZE: 18,

    MARGIN_BOTTOM: windowHeight * 0.10,
    MARGIN_TOP_FROM_DRAWER_HEADER: windowHeight * 0.05,
    MARGIN_TOP_FROM_BACKBUTTON_HEADER: windowHeight * 0.03,

    SPACES_VERTICAL_BETWEEN_BOXES: 10,

    SQUARE_ICON_SIZE: 24,

    //Size of Icons which appear when deleting editing lists / tasks
    EDIT_TASKS_ICON_SIZE: 24,

    //Size of Icon which appears when entering edit mode for lists / tasks
    MORE_ICON_SIZE: 30,

    //used for styling the main content of screens
    SCREEN_HEADER: 25,
    SCREEN_HEADER_WEIGHT: "600",
    SCREEN_TEXT_NORMAL: 18,
    SCREEN_TEXT_SMALL: 15,
    SCREEN_TEXT_XS: 12,
}