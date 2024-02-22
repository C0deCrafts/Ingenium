import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {COLOR} from "../../constants/styleSettings";

function ProfileSettings({navigation}){
    return (
        <SafeAreaView  style={styles.container}>
            <CustomDrawerHeader title="Profil bearbeiten" onPress={()=> navigation.openDrawer()}/>
            <View style={styles.content}>
                <Text>Profil bearbeiten</Text>
            </View>
        </SafeAreaView>
    )
}

export default ProfileSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
})