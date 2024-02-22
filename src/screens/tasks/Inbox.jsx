import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomBackButton from "../../components/CustomBackButton";
import {useNavigation} from "@react-navigation/native";
import {COLOR} from "../../constants/styleSettings";

function Inbox(){
    const navigation = useNavigation(); // useNavigation-Hook verwenden

    const handleGoBack = () => {
        navigation.goBack(); // goBack() aufrufen, wenn der Button gedrückt wird
    };

    return (
        <SafeAreaView  style={styles.container}>
            <CustomBackButton onPress={handleGoBack}/>
            <View style={styles.content}>
                <Text>Inbox</Text>
            </View>
        </SafeAreaView>
    )
}

export default Inbox;

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