import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomButton from "../../components/CustomButton";

function CreateTask({navigation}){

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.content}>
                <Text>Create Task</Text>
            </View>
            <CustomButton title={"Create Task Details"} onPressFunction={()=>{navigation.push("CreateTaskDetails_Screen")}}/>
        </SafeAreaView>
    )
}

export default CreateTask;

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