import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const MoodTracker = () => {
  const [mood, setMood] = useState(null);
  const [moodText, setMoodText] = useState('');

  const handleMoodSelection = async (selectedMood) => {
    setMood(selectedMood);
    await saveMood(selectedMood);
    handleMoodText(selectedMood);
  };

  const handleMoodText = (selectedText) => {
    if (selectedText === '😄') {
      setMoodText('Keep it up!! 😊');
    } else if (selectedText === '😞') {
      setMoodText('Everything will be fine, no need to worry!');
    } else if (selectedText === '😠') {
      setMoodText('Calm down and let it go. 🙂🙃');
    } else if (selectedText === '😌') {
      setMoodText('Peace ☮️');
    }
  };

  const saveMood = async (selectedMood) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date
      const existingData = await AsyncStorage.getItem(currentDate); // Retrieve existing data for the current date

      let newData = [];
      if (existingData) {
        newData = JSON.parse(existingData); // Parse existing data from JSON
      }

      newData.push({ mood: selectedMood }); // Add the new mood entry

      await AsyncStorage.setItem(currentDate, JSON.stringify(newData)); // Save the updated data
      console.log('Mood saved successfully.');
    } catch (error) {
      console.log('Error saving mood:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.emojiContainer}>
        <TouchableOpacity
          style={styles.emoji}
          onPress={() => handleMoodSelection('😄')}
        >
          <Text style={styles.emojiText}>😄</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emoji}
          onPress={() => handleMoodSelection('😞')}
        >
          <Text style={styles.emojiText}>😞</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emoji}
          onPress={() => handleMoodSelection('😠')}
        >
          <Text style={styles.emojiText}>😠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emoji}
          onPress={() => handleMoodSelection('😌')}
        >
          <Text style={styles.emojiText}>😌</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.selectedMood}>
        {mood ? moodText : 'How are you today?'}
      </Text>
    </View>
  );
};

export default MoodTracker;
