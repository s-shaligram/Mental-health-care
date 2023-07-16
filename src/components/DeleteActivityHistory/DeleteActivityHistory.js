import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Linking, ActivityIndicator, TouchableOpacity} from 'react-native';

const DeleteActivityHistory = () => {
    return (
        <View style={styles.container}>
            <View style={{paddingLeft: 50, paddingRight: 50}}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Data will be deleted permanently, and you will NOT be able to restore the data.</Text>
                <Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 15}}>Are you sure you want to delete all activity history?</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: 'silver'}]}
                >
                    <Text style={styles.buttonText}>
                        No
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Yes
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#ef002c", //Orange
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row"
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DeleteActivityHistory;