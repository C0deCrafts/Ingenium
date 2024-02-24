import {Text, View, StyleSheet, TouchableOpacity, Image, Platform, Alert} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import MapView, {Marker} from 'react-native-maps';
import * as Linking from "expo-linking"

function Contact({navigation}) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    const phoneNumber = "+43 316 82 18 18";
    const mail = "office@ingenium.co.at";
    const address = "Herrengasse 26 - Jungferngasse 1\nA- 8010 Graz"

    const latitude = 47.0694893973945;
    const longitude = 15.440459310880366;

    const openMapChoice = (latitude, longitude) => {
        if (Platform.OS === 'ios') {
            // Für iOS: Benutzer wählt zwischen Apple Karten und Google Maps
            Alert.alert(
                "Navigation starten",
                "Wähle eine Navigations-App:",
                [
                    {
                        text: "Apple Karten",
                        onPress: () => Linking.openURL(`http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`)
                    },
                    {
                        text: "Google Maps",
                        onPress: () => {
                            const url = `comgooglemaps://?daddr=${latitude},${longitude}&directionsmode=driving`;
                            Linking.canOpenURL(url).then((supported) => {
                                if (supported) {
                                    Linking.openURL(url);
                                } else {
                                    // Falls Google Maps nicht installiert ist, öffnen Sie die Webversion.
                                    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`);
                                }
                            });
                        }
                    },
                    {
                        text: "Abbrechen",
                        style: "cancel"
                    }
                ],
                {cancelable: true}
            );
        } else {
            // Für Android: Öffnet direkt Google Maps, da Apple Karten nicht verfügbar ist
            const url = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
            Linking.openURL(url);
        }
    };

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomDrawerHeader title="Kontaktiere uns" onPress={() => navigation.openDrawer()}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <View style={isDarkMode ? styles.boxDark : styles.boxLight}>
                    <View style={styles.imageContainer}>
                        <Image source={require("../../assets/images/Ingenium_Schriftzug.png")}
                               style={{width: "90%"}}
                               resizeMode={"contain"}
                        />
                    </View>
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
                        <TouchableOpacity onPress={() => openMapChoice(latitude,longitude)}
                                          style={styles.contactContainerButton}>
                            <Icon name={ICONS.NAVIGATION.ACTIVE}
                                  size={SIZES.CONTACT_ICON_SIZE}
                                  color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}
                            />
                            <Text style={isDarkMode ? styles.textDark : styles.textLight}>{address}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerMap}>
                        <MapView style={styles.map}
                                 initialRegion={{
                                     latitude: latitude,
                                     longitude: longitude,
                                     latitudeDelta: 0.01,
                                     longitudeDelta: 0.01,
                                 }}
                        >
                            <Marker coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                            }}
                                    onPress={() => openMapChoice(latitude,longitude)}
                            />
                        </MapView>
                    </View>
                    <View style={styles.sozialMediaContent}>
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Image source={require("../../assets/icons/instagram logo_icon.png")}
                                   style={{width: 50, height: 50}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Image source={require("../../assets/icons/facebook logo_icon.png")}
                                   style={{width: 50, height: 50}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Image source={require("../../assets/icons/linkedin logo_icon.png")}
                                   style={{width: 50, height: 50}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Image source={require("../../assets/icons/video_youtube_icon.png")}
                                   style={{width: 50, height: 50}}/>
                        </TouchableOpacity>
                    </View>
                </View>
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
        marginBottom: SIZES.MARGIN_BOTTOM,
        marginTop: SIZES.MARGIN_TOP_FROM_DRAWER_HEADER,
    },
    contentDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        alignItems: 'center',
        marginBottom: SIZES.MARGIN_BOTTOM,
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
    },
    map: {
        width: "100%",
        height: "100%",
    },
    containerMap: {
        flex: 1,
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    navigateButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})