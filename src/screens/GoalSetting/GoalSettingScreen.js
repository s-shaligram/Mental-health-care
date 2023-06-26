import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setGoals } from "../././../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalSettingScreen = ({ onFinishGoalSetting, setShowGoalSetting }) => {
  const [goals, setGoals] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleFinish = async () => {
    try {
      // Create an object to store the goals and checkedItems
      const data = {
        goals: goals,
        checkedItems: checkedItems,
      };

      // Save the data to AsyncStorage
      await AsyncStorage.setItem("userGoals", JSON.stringify(data));

      // Call the onFinishGoalSetting callback with the goals
      onFinishGoalSetting(data);
    } catch (error) {
      console.error("Error saving goals and checkedItems to storage:", error);
    }
  };

  const handleClose = () => {
    //onFinishGoalSetting(null);
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
          <Text style={styles.title}> Set Your Daily Goal</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {/* <TextInput
                    style={styles.input}
                    placeholder="Select from below or Enter your goal"
                    value={goals}
                    onChangeText={setGoals}
                /> */}

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
          <TouchableOpacity
            style={styles.checklistItemContainer}
            onPress={() => handleCheckItem("Engage in Physical Exercise")}
          >
            <FontAwesome
              name={
                checkedItems.includes("Engage in Physical Exercise")
                  ? "check-square-o"
                  : "square-o"
              }
              size={20}
              color={
                checkedItems.includes("Engage in Physical Exercise")
                  ? "#1D741B"
                  : "#000"
              }
            />
            <Text style={styles.checklistItem}>
              Engage in Physical Exercise
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checklistItemContainer}
            onPress={() => handleCheckItem("Connect with Loved Ones")}
          >
            <FontAwesome
              name={
                checkedItems.includes("Connect with Loved Ones")
                  ? "check-square-o"
                  : "square-o"
              }
              size={20}
              color={
                checkedItems.includes("Connect with Loved Ones")
                  ? "#1D741B"
                  : "#000"
              }
            />
            <Text style={styles.checklistItem}>Connect with Loved Ones</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checklistItemContainer}
            onPress={() => handleCheckItem("Practice Gratitude")}
          >
            <FontAwesome
              name={
                checkedItems.includes("Practice Gratitude")
                  ? "check-square-o"
                  : "square-o"
              }
              size={20}
              color={
                checkedItems.includes("Practice Gratitude") ? "#1D741B" : "#000"
              }
            />
            <Text style={styles.checklistItem}>Practice Gratitude</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checklistItemContainer}
            onPress={() => handleCheckItem("Engage in Creative Activities")}
          >
            <FontAwesome
              name={
                checkedItems.includes("Engage in Creative Activities")
                  ? "check-square-o"
                  : "square-o"
              }
              size={20}
              color={
                checkedItems.includes("Engage in Creative Activities")
                  ? "#1D741B"
                  : "#000"
              }
            />
            <Text style={styles.checklistItem}>
              Engage in Creative Activities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checklistItemContainer}
            onPress={() => handleCheckItem("Prioritize Self-Care")}
          >
            <FontAwesome
              name={
                checkedItems.includes("Prioritize Self-Care")
                  ? "check-square-o"
                  : "square-o"
              }
              size={20}
              color={
                checkedItems.includes("Prioritize Self-Care")
                  ? "#1D741B"
                  : "#000"
              }
            />
            <Text style={styles.checklistItem}>Prioritize Self-Care</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checklistItemContainer}
            onPress={() =>
              handleCheckItem("Monitor and Challenge Negative Thoughts")
            }
          >
            <FontAwesome
              name={
                checkedItems.includes("Monitor and Challenge Negative Thoughts")
                  ? "check-square-o"
                  : "square-o"
              }
              size={20}
              color={
                checkedItems.includes("Monitor and Challenge Negative Thoughts")
                  ? "#1D741B"
                  : "#000"
              }
            />
            <Text style={styles.checklistItem}>
              Monitor and Challenge Negative Thoughts
            </Text>
          </TouchableOpacity>
          {/* Repeat the above TouchableOpacity block for other checklist items */}
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const CancelDialog = () => {
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

  return (
    <>
      {!showCancelModal && <GoalList />}
      {showCancelModal && <CancelDialog />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    top: 55,
    margin: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  closeButton: {},
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",

    marginTop: 5,
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
    shadowColor: "grey",
    marginTop: 600,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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

export default connect(null, { setGoals })(GoalSettingScreen);
