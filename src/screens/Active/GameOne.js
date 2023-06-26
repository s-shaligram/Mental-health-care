import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles from "./style";
import { useGlobalContext } from "../../hooks/useGlobalContext";
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
  require("./../../../assets/Avatar/one.jpg"),
  require("./../../../assets/Avatar/two.jpg"),
  require("./../../../assets/Avatar/three.jpg"),
  require("./../../../assets/Avatar/four.jpg"),
  require("./../../../assets/Avatar/five.jpg"),
  require("./../../../assets/Avatar/six.jpg"),
  require("./../../../assets/Avatar/seven.jpg"),
  require("./../../../assets/Avatar/eight.jpg"),
  require("./../../../assets/Avatar/nine.jpg"),
  require("./../../../assets/Avatar/ten.jpg"),
];
const Active = () => {
  const [count, setCount] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);
  const countRef = useRef(count);
  const { theme } = useGlobalContext();
  const incrementCount = () => {
    if (count < 10) {
      setCount(count + 1);
      setRandomIndex(Math.floor(Math.random() * randomTexts.length));
    } else if (count === 9) {
      setCount(count + 1);
    }
  };

  const handlePress = () => {
    if (count === 10) {
      Alert.alert(
        "Congratulations!",
        "Great job! Do you want to start the count again?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: resetCount },
        ]
      );
    }
  };

  const resetCount = () => {
    setCount(0);
  };

  const renderAvatars = () => {
    const avatarViews = [];
    if (count > 0) {
      const lastAvatarIndex = Math.min(count - 1, avatars.length - 1);
      const progressBarColor = `rgb(${255 - count * 25}, ${count * 25}, 0)`;
      avatarViews.push(
        <View
          key="progressBar"
          style={[styles.progressBar, { borderColor: progressBarColor }]}
        />,
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
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <View style={styles.avatarsContainer}>{renderAvatars()}</View>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.text}>{randomTexts[randomIndex]}</Text>
      <TouchableOpacity
        onPress={incrementCount}
        disabled={count >= 10}
        style={[styles.button, count >= 10 && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>
          {count === 10 ? "Great Job!" : "Press Me"}
        </Text>
      </TouchableOpacity>
      {count === 10 && (
        <TouchableOpacity onPress={handlePress} style={styles.resetButton}>
          <Text style={{ ...styles.buttonText, color: theme.color }}>
            Reset Count
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Active;
