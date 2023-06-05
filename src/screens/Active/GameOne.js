import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";

const randomTexts = [
  "Keep going!",
  "You can do it",
  "You're doing great!",
  "Almost there!",
  "Fantastic!",
  "Nice work!",
  "Calm Down",
  "Let it Be",
  "Time will Fly",
  "You are awesome",
];
const avatars = [
  // require("/Users/ghanashyamshingate/Desktop/Fanshawe Level3/Capstone Project/Mental-health-care/assets/KeepGoing.png"),
  // require("/Users/ghanashyamshingate/Desktop/Fanshawe Level3/Capstone Project/Mental-health-care/assets/HappyEmotion.jpg"),
  // require("/Users/ghanashyamshingate/Desktop/Fanshawe Level3/Capstone Project/Mental-health-care/assets/fun.avif"),
];
const Active = () => {
  const [count, setCount] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);

  const incrementCount = () => {
    if (count < 10) {
      setCount(count + 1);
      setRandomIndex(Math.floor(Math.random() * randomTexts.length));
    }
  };
  const renderAvatars = () => {
    const avatarViews = [];

    if (count > 0) {
      const lastAvatarIndex = Math.min(count - 1, avatars.length - 1);

      avatarViews.push(
        <Image
          key={lastAvatarIndex}
          source={avatars[lastAvatarIndex]}
          style={styles.avatar}
          resizeMode="contain"
        />
      );
    }

    return avatarViews;
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarsContainer}>{renderAvatars()}</View>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.text}>{randomTexts[randomIndex]}</Text>
      <TouchableOpacity
        onPress={incrementCount}
        disabled={count >= 10}
        style={[styles.button, count >= 10 && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Active;
