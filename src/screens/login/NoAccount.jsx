import { Text, View, StyleSheet } from "react-native";

function NoAccount(){
    return (
        <View style={styles.container}>
            <Text>NoAccount</Text>
        </View>
    )
}

export default NoAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})