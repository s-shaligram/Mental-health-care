import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CancelDialog = ({ handleCancelOption }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>
          Are you sure you want to cancel goal setting?
        </Text>
        <TouchableOpacity
          style={styles.modalContinueButton}
          onPress={() => handleCancelOption("continue")}
        >
          <Text style={styles.modalOptionText}>Continue with goals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalExitButton}
          onPress={() => handleCancelOption("exit")}
        >
          <Text style={styles.modalOptionText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 60,
    marginTop: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 250,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: 200,
    marginBottom: 450,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalContinueButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#1D741B",
    marginBottom: 10,
  },
  modalExitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#FFA500",
    marginBottom: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CancelDialog;
