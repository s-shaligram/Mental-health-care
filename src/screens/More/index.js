import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function More() {
    return (
        <></>
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
