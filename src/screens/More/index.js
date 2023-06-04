import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import NearByMedicalCenter from "../../components/nearByMedicalCenter";

function More() {
    return (
        <ScrollView>
            <View style={styles.container}>
               <NearByMedicalCenter></NearByMedicalCenter>
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
