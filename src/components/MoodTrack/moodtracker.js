import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';

const MoodTracker = () => {
  const [mood, setMood] = useState();

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
  };

  const [moodText, setMoodText] = useState('');

  const handleMoodText = (selectedText) => {
    
    if(selectedText === '😄'){
        setMoodText('Keep it up!! 😊');
    } 
    else if(selectedText === '😞'){
        setMoodText('Everything will be fine, no need to worry!')
    }
    else if(selectedText === '😠'){
        setMoodText('Calm down and let it go. 🙂🙃')
    }
    else if(selectedText === '😌'){
        setMoodText('Peace ☮️')
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.emojiContainer}>
        <TouchableOpacity
          style={styles.emoji}
          onPress={() => {
            handleMoodSelection('😄');
            handleMoodText('😄');
        }}
        >
          <Text style={styles.emojiText}>😄</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emoji}
          onPress={() => {
            handleMoodSelection('😞');
            handleMoodText('😞');
        }}
        >
        <Text style={styles.emojiText}>😞</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emoji}
          onPress={() => {
            handleMoodSelection('😠');
            handleMoodText('😠');
        }}
        >
          <Text style={styles.emojiText}>😠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emoji}
          onPress={() => {
            handleMoodSelection('😌');
            handleMoodText('😌');
        }}
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