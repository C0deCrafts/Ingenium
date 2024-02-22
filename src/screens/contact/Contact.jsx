import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {COLOR} from "../../constants/styleSettings";

function Contact({navigation}){
    return (
        <SafeAreaView  style={styles.container}>
            <CustomDrawerHeader title="Kontakt" onPress={()=> navigation.openDrawer()}/>
            <View style={styles.content}>
                <Text>Kontakt</Text>
            </View>
        </SafeAreaView>
    )
}

export default Contact;

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