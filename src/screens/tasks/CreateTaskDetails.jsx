import {Text, View, StyleSheet, SafeAreaView} from "react-native";

function CreateTaskDetails(){

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.content}>
                <Text>CreateTaskDetails</Text>
            </View>
        </SafeAreaView>
    )
}

export default CreateTaskDetails;

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