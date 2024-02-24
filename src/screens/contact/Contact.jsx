import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";

function Contact({navigation}) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const phoneNumber = "+43 316 82 18 18";
    const mail = "office@ingenium.co.at";
    const address = "Herrengasse 26 - Jungferngasse 1\nA- 8010 Graz"

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomDrawerHeader title="Kontaktiere uns" onPress={() => navigation.openDrawer()}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <View style={isDarkMode ? styles.boxDark : styles.boxLight}>
                    <View>
                        <TouchableOpacity onPress={() => {
                        }} style={styles.contactContainerButton}>
                            <Icon name={ICONS.PHONE.ACTIVE}
                                  size={SIZES.CONTACT_ICON_SIZE}
                                  color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}
                            />
                            <Text style={isDarkMode ? styles.textDark : styles.textLight}>{phoneNumber}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                        }} style={styles.contactContainerButton}>
                            <Icon name={ICONS.MAIL.ACTIVE}
                                  size={SIZES.CONTACT_ICON_SIZE}
                                  color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}
                            />
                            <Text style={isDarkMode ? styles.textDark : styles.textLight}>{mail}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                        }} style={styles.contactContainerButton}>
                            <Icon name={ICONS.NAVIGATION.ACTIVE}
                                  size={SIZES.CONTACT_ICON_SIZE}
                                  color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}
                            />
                            <Text style={isDarkMode ? styles.textDark : styles.textLight}>{address}</Text>
                        </TouchableOpacity>
                    </View>
                   <View>
                       <Text>Map</Text>
                   </View>
                    <View style={styles.sozialMediaContent}>
                        <TouchableOpacity onPress={()=>{}}>
                            <Image source={require("../../assets/icons/instagram logo_icon.png")}
                                   style={{ width: 50, height: 50}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{}}>
                            <Image source={require("../../assets/icons/facebook logo_icon.png")}
                                   style={{ width: 50, height: 50}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{}}>
                            <Image source={require("../../assets/icons/linkedin logo_icon.png")}
                                   style={{ width: 50, height: 50}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{}}>
                            <Image source={require("../../assets/icons/video_youtube_icon.png")}
                                   style={{ width: 50, height: 50}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image source={require("../../assets/images/Ingenium_Logo_with_box.png")}
                       style={{ width: "90%"}}
                       resizeMode={"contain"}
                />
            </View>
        </View>
    )
}

export default Contact;

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
        alignItems: 'center',
        marginBottom: SIZES.MARGIN_BOTTOM - 50,
        marginTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
    },
    contentDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        alignItems: 'center',
        marginBottom: SIZES.MARGIN_BOTTOM - 50,
        marginTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
    },
    boxLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BOX_COLOR,
        justifyContent: "space-between",
    },
    boxDark: {
        flex: 1,
        backgroundColor: DARKMODE.BOX_COLOR,
        justifyContent: "space-between",
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.TEXT_SIZE,
        marginLeft: 8,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.TEXT_SIZE,
        marginLeft: 8,
    },
    contactContainerButton: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        marginTop: 20,
    },
    sozialMediaContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        marginVertical: SIZES.SPACING_HORIZONTAL_DEFAULT,
    }
})