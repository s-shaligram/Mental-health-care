import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function More() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.title}>Text 01</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.title}>Text 02</Text>
                <View style={styles.line} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
        marginHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
        marginHorizontal: 10,
    },
});

export default More;
