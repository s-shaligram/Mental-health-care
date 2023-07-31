// src/screens/EmergencyContactsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmergencyContactsScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch the emergency contacts from AsyncStorage on component mount
    const fetchContacts = async () => {
      try {
        const existingContacts = await AsyncStorage.getItem(
          "emergencyContacts"
        );
        const parsedContacts = existingContacts
          ? JSON.parse(existingContacts)
          : [];
        setContacts(parsedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = async (index) => {
    try {
      // Get the current list of contacts
      const currentContacts = [...contacts];

      // Remove the contact at the specified index
      currentContacts.splice(index, 1);

      // Update the state with the updated contact list
      setContacts(currentContacts);

      // Save the updated contact list to AsyncStorage
      await AsyncStorage.setItem(
        "emergencyContacts",
        JSON.stringify(currentContacts)
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const renderContactItem = ({ item, index }) => (
    <View style={styles.contactItem}>
      <Text>Name: {item.name}</Text>
      <Text>Phone Number: {item.phoneNumber}</Text>
      <Text>Relationship: {item.relationship}</Text>
      <TouchableOpacity
        onPress={() => handleDeleteContact(index)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contactItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  deleteButton: {
    marginTop: 10,
    //backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#FFA500", //Orange
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EmergencyContactsScreen;
