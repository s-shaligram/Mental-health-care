import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setGoals } from "../././../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationContext } from "../../hooks/useNotificationContext";
import CancelDialog from "./CancelDialog"; // Import the new CancelDialog component

const GoalSettingScreen = ({ onFinishGoalSetting, setShowGoalSetting }) => {
  const [goals, setGoals] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { scheduleNotification } = useContext(NotificationContext);

  useEffect(() => {
    // Schedule the end-of-day notification at 9:00 PM
    scheduleEndOfDayNotification();
  }, []);

  const scheduleEndOfDayNotification = async () => {
    try {
      const endOfDay = new Date();
      endOfDay.setHours(21, 0, 0, 0); // Set the notification time to 9:00 PM
      const currentTime = new Date();
      if (endOfDay < currentTime) {
        // If endOfDay is before the current time, schedule the notification for tomorrow
        endOfDay.setDate(endOfDay.getDate() + 1);
      }

      const secondsUntilEndOfDay = Math.round(
        (endOfDay.getTime() - currentTime.getTime()) / 1000
      );
      await scheduleNotification(
        "EOG", // Activity key for end-of-day notification
        "Daily Goals",
        "Have you completed your daily scheduled goals?",
        secondsUntilEndOfDay
      );
      console.log("End-of-day notification scheduled.");
    } catch (error) {
      console.error("Error scheduling end-of-day notification:", error);
    }
  };

  const handleFinish = async () => {
    try {
      // Create an object to store the goals and checkedItems
      const data = {
        goals: goals,
        checkedItems: checkedItems,
      };

      //Notification
      await scheduleNotification(
        "GS",
        "Goal Set",
        "Congratulations..you have set today's goals",
        3
      );
      // Save the data to AsyncStorage
      await AsyncStorage.setItem("userGoals", JSON.stringify(data));

      // Call the onFinishGoalSetting callback with the goals
      onFinishGoalSetting(data);
    } catch (error) {
      console.error("Error saving goals and checkedItems to storage:", error);
    }
  };

  const handleClose = () => {
    setShowCancelModal(true);
  };

  const handleCancelOption = (option) => {
    setSelectedOption(option);
    setShowCancelModal(false);
    if (option === "continue") {
      setShowGoalSetting(true);
    } else if (option === "exit") {
      onFinishGoalSetting(null);
    }
  };

  const handleCheckItem = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const GoalList = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Set Your Daily Goal</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <AntDesign
              name="close"
              size={24}
              color="white"
              backgroundColor="red"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.checklistHeader}>Checklist for Daily Goals:</Text>
          <TouchableOpacity
            style={styles.checklistItemContainer}
            onPress={() =>
              handleCheckItem("Practice Mindfulness or Meditation")
            }
          >
            <FontAwesome
              name={
                checkedItems.includes("Practice Mindfulness or Meditation")
                  ? "check-square-o"
                  : "square-o"
              }
              size={20}
              color={
                checkedItems.includes("Practice Mindfulness or Meditation")
                  ? "#1D741B"
                  : "#000"
              }
            />
            <Text style={styles.checklistItem}>
              Practice Mindfulness or Meditation
            </Text>
          </TouchableOpacity>
          {/* Add other checklist items here */}
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      {!showCancelModal && <GoalList />}
      {showCancelModal && (
        <CancelDialog handleCancelOption={handleCancelOption} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  content: {},
  checklistHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 5,
  },
  checklistItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
    marginVertical: 15,
  },
  checklistItem: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default connect(null, { setGoals })(GoalSettingScreen);
