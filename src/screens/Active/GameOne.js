import React, { useState, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import styles from "./style";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { NotificationContext } from "../../hooks/useNotificationContext";
const { width, height } = Dimensions.get("window");
const android = Platform.OS == "android";

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
  require("./../../../assets/Avatar/one.png"),
  require("./../../../assets/Avatar/two.png"),
  require("./../../../assets/Avatar/three.png"),
  require("./../../../assets/Avatar/four.png"),
  require("./../../../assets/Avatar/five.png"),
  require("./../../../assets/Avatar/six.png"),
  require("./../../../assets/Avatar/seven.png"),
  require("./../../../assets/Avatar/eight.png"),
  require("./../../../assets/Avatar/nine.png"),
  require("./../../../assets/Avatar/ten.png"),
];
const Active = () => {
  const [count, setCount] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);
  const countRef = useRef(count);
  const { theme } = useGlobalContext();
  const { scheduleNotification } = useContext(NotificationContext);
  const incrementCount = async () => {
    if (count < 10) {
      setCount(count + 1);
      setRandomIndex(Math.floor(Math.random() * randomTexts.length));
    } else if (count === 9) {
      setCount(count + 1);
    }
  };

  const handlePress = async () => {
    if (count === 10) {
      await scheduleNotification(
        "CDG",
        "Clam down Game",
        "Congratulations..you have completed the game",
        3
      );
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
      <View
        style={{
          borderRadius: 40,
          backgroundColor: theme.background,
          height: android ? height * 0.6 : height * 0.5,
          width: width * 0.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>{renderAvatars()}</View>
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
            <Text style={{ ...styles.buttonText, color: "#FFA500" }}>
              Reset Count
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Active;
//Check if it's 10:00 PM and show the completion notification
// const checkTimeAndShowNotification = async () => {
//   const currentTime = new Date().getTime();
//   const notificationTime = new Date();
//   notificationTime.setHours(16, 28, 0); // Set the notification time to 10:00 PM
//   console.log("Current time", currentTime);
//   console.log(notificationTime.getTime());
//   if (true) {
//     // Get the user's goals from AsyncStorage
//     const storedData = await AsyncStorage.getItem("userGoals");
//     if (storedData) {
//       const { goals: storedGoals } = JSON.parse(storedData);
//       setGoalsState(storedGoals);
//     }

//     // Schedule the completion notification
//     await scheduleNotification(
//       "Completion",
//       "Goal Completion",
//       "Have you completed your goals for today?",
//       3
//     );
//   }
// };
// // Schedule the repeating notification
// await setRepeating({
//   content: {
//     title: "Daily Goal",
//     body: "Have you completed your goals for today?",
//   },
//   trigger: { seconds: Math.ceil(delay / 1000) }, // Convert delay to seconds
//   repeats: true,
// });
// Schedule a test notification with a delay of 5 seconds
// useEffect(() => {
//   const checkTimeAndShowNotification = async () => {
//     const now = new Date();
//     const targetTime = new Date(now); // Create a new date object for today
//     targetTime.setHours(16, 45, 0, 0); // Set the target time to 10:00 PM today

//     if (now >= targetTime) {
//       // The current time has already passed the target time for today.
//       // Set the target time to 10:00 PM tomorrow.
//       targetTime.setDate(targetTime.getDate() + 1);
//     }

//     // Calculate the delay (in milliseconds) from now to the target time
//     const delay = targetTime.getTime() - now.getTime();
//     console.log("Now", now);
//     console.log("TargetTime", targetTime);
//     console.log("Delay", delay);

//     await scheduleNotification({
//       content: {
//         title: "Test Notification",
//         body: "This is a test notification with a 5-second delay!",
//       },
//       trigger: {
//         seconds: 5,
//       },
//     })
//       .then(() => {
//         console.log("Test notification scheduled with a 5-second delay.");
//       })
//       .catch((error) => {
//         console.error("Error scheduling test notification:", error);
//       });

//     checkTimeAndShowNotification();
//   };
// }, []);
