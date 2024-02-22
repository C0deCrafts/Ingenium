import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomButton from "../../components/CustomButton";


function EditTask({navigation}){

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.content}>
                <Text>EditTask</Text>
            </View>
            <CustomButton title={"Details"} onPressFunction={()=>{navigation.push("EditTaskDetails_Screen")}} />
        </SafeAreaView>
    )
}

export default EditTask;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})