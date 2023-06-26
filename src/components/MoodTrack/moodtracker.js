import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

const MoodTracker = () => {
  const [mood, setMood] = useState(null);
  const [moodText, setMoodText] = useState("");
  const [moodData, setMoodData] = useState([]);

  const handleMoodSelection = async (selectedMood) => {
    setMood(selectedMood);
    await saveMood(selectedMood);
    handleMoodText(selectedMood);
  };

  const handleMoodText = (selectedText) => {
    if (selectedText === "😄") {
      setMoodText("Keep it up!! 😊");
    } else if (selectedText === "😞") {
      setMoodText("Everything will be fine, no need to worry!");
    } else if (selectedText === "😠") {
      setMoodText("Calm down and let it go. 🙂🙃");
    } else if (selectedText === "😌") {
      setMoodText("Peace ☮️");
    }
  };

  const saveMood = async (selectedMood) => {
    try {
      const currentDate = new Date().toISOString().split("T")[0]; // Get the current date
      const existingData = await AsyncStorage.getItem(currentDate); // Retrieve existing data for the current date

      let newData = [];
      if (existingData) {
        newData = JSON.parse(existingData); // Parse existing data from JSON
      }

      newData.push({ mood: selectedMood }); // Add the new mood entry

      await AsyncStorage.setItem(currentDate, JSON.stringify(newData)); // Save the updated data
      console.log("Mood saved successfully.", newData);
    } catch (error) {
      console.log("Error saving mood:", error);
    }
  };

  const retrieveMoodData = async () => {
    try {
      const currentDate = new Date().toISOString().split("T")[0]; // Get the current date
      const existingData = await AsyncStorage.getItem(currentDate); // Retrieve existing data for the current date

      if (existingData) {
        const parsedData = JSON.parse(existingData);
        setMoodData(parsedData);
      }
    } catch (error) {
      console.log("Error retrieving mood data:", error);
    }
  };

  useEffect(() => {
    retrieveMoodData();
  }, []);

  const renderMoodSelection = () => {
    if (mood === null) {
      return (
        <View style={styles.emojiContainer}>
          <TouchableOpacity
            style={styles.emoji}
            onPress={() => handleMoodSelection("😄")}
          >
            <Text style={styles.emojiText}>😄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.emoji}
            onPress={() => handleMoodSelection("😞")}
          >
            <Text style={styles.emojiText}>😞</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.emoji}
            onPress={() => handleMoodSelection("😠")}
          >
            <Text style={styles.emojiText}>😠</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.emoji}
            onPress={() => handleMoodSelection("😌")}
          >
            <Text style={styles.emojiText}>😌</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderMoodSelection()}
      <Text style={styles.selectedMood}>
        {mood ? moodText : "How are you today?"}
      </Text>
      {/* <Text style={styles.savedMoods}>Mood in this week</Text>
      <View style={styles.moodDataContainer}>
        {moodData.map((entry, index) => (
          <Text key={index} style={styles.moodDataText}>
            {entry.mood}
          </Text>
        ))}
      </View> */}
    </View>
  );
};

export default MoodTracker;