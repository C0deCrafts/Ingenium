import {Text, View, StyleSheet, SafeAreaView} from "react-native";

function EditTaskDetails(){

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.content}>
                <Text>Edit Task Details</Text>
            </View>
        </SafeAreaView>
    )
}

export default EditTaskDetails;

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