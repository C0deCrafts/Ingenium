import {Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const LIGHTMODE = {
    BACKGROUNDCOLOR_OLD: "#F9F9F9",
    BACKGROUNDCOLOR: "#F2F2F2",
    BUTTONCOLOR: "#009FE3",
    BUTTONLABEL: "#FFFFFF",

    BOX_COLOR: "#FFFFFF",

    BORDER_COLOR: "#000000",

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
    BUTTONCOLOR: "#009FE3",
    BUTTONLABEL: "#FFFFFF",

    BOX_COLOR: "#1C1C1E",

    BORDER_COLOR: "#242426",

    DRAWER_HEADER_LABEL_COLOR: "#FFFFFF",

    ICONCOLOR: "#FFFFFF",
    ICONCOLOR_ACTIVE: "#009FE3",
    ICONCOLOR_INACTIVE: "#FFFFFF",

    INPUT_BOX_COLOR: "#343434",

    TEXTINPUT_COLOR: "#FFFFFF",
    TEXT_COLOR: "#FFFFFF",
    CURSOR_COLOR: "#009FE3",

    PLACEHOLDER_TEXTCOLOR: "rgba(99 108 112 / 0.7)",
}

export const COLOR = {
    BUTTONCOLOR: "#009FE3",
    BUTTONLABEL: "#FFFFFF",
}

export const SIZES = {
    BOTTOM_TAB_LABEL_SIZE: 12,
    BOTTOM_TAB_BAR_HEIGHT: 80,


    BACK_BUTTON_ICON_SIZE: 20,
    BACK_BUTTON_LABEL_SIZE: 18,

    CLOSE_BUTTON_ICON_SIZE: 50,

    DEFAULT_MARGIN_HORIZONTAL_SCREEN: 20,
    DRAWER_BUTTON_ICON_SIZE: 40,

    DRAWER_ICONS_SIZE: 25,
    DRAWER_LABEL_SIZE: 18,

    BUTTON_LABEL_SIZE: 18,
    BUTTON_LABEL_WEIGHT: "600",

    BORDER_RADIUS: 4,
    BORDER_WIDTH: 1,

    TEXTINPUT_SIZE: 18,

    SPACING_HORIZONTAL_DEFAULT: 20,

    PADDING_TOP_DRAWER_HEADER_FROM_SAFEAREAVIEW: 40,
    PADDING_TOP_BACK_HEADER_FROM_SAFEAREAVIEW: 49,

    DRAWER_HEADER_FONTSIZE: 30,
    DRAWER_HEADER_FONTWEIGHT: "700",

    BACK_HEADER_FONTSIZE: 18,
}