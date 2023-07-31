// src/screens/EmergencyContactScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmergencyContactScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relationship, setRelationship] = useState("");

  const handleSaveContact = async () => {
    if (name && phoneNumber && relationship) {
      const newContact = {
        name,
        phoneNumber,
        relationship,
      };

      try {
        // Get existing contacts from AsyncStorage
        const existingContacts = await AsyncStorage.getItem(
          "emergencyContacts"
        );
        const parsedContacts = existingContacts
          ? JSON.parse(existingContacts)
          : [];

        // Add the new contact to the array
        const updatedContacts = [...parsedContacts, newContact];

        // Save the updated contacts to AsyncStorage
        await AsyncStorage.setItem(
          "emergencyContacts",
          JSON.stringify(updatedContacts)
        );

        // Clear the input fields after saving
        setName("");
        setPhoneNumber("");
        setRelationship("");

        Alert.alert(
          "Contact Saved",
          "Emergency contact has been saved successfully."
        );
      } catch (error) {
        console.error("Error saving contact:", error);
      }
    } else {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all fields before saving."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Relationship"
        value={relationship}
        onChangeText={setRelationship}
        style={styles.input}
      />
      <Button
        title="Save Contact"
        onPress={handleSaveContact}
        color={"#1D741B"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EmergencyContactScreen;
