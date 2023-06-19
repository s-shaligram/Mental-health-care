import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewGoalsButton = () => {
  const [goals, setGoals] = useState([]);
  const [goalText, setGoalText] = useState("");
  const [goalInfo, setGoalInfo] = useState([]);

  useEffect(() => {
    retrieveGoals();
  }, []);

  const retrieveGoals = async () => {
    try {
      const goalsData = await AsyncStorage.getItem("userGoals");
      if (goalsData !== null) {
        const parsedData = JSON.parse(goalsData);
        const goalsArray = parsedData.goals.checkedItems;
        const goalTextValue = parsedData.goals.goals;
        setGoals(goalsArray);
        setGoalText(goalTextValue);
      } else {
        console.log("No goals found.");
        setGoals([]);
        setGoalText("");
      }
    } catch (error) {
      console.error("Error retrieving goals:", error);
    }
  };

  const handleViewGoals = () => {
    setGoalInfo([
      {
        title: "Practice Mindfulness or Meditation",
        description:
          "Set a goal to engage in mindfulness or meditation exercises for a certain amount of time each day. This can help reduce stress, improve focus, and enhance overall well-being.",
      },
      {
        title: "Engage in Physical Exercise",
        description:
          "Aim to incorporate physical activity into your daily routine. It can be a walk, yoga session, workout, or any form of exercise that you enjoy. Regular exercise has been shown to boost mood, reduce anxiety, and increase energy levels.",
      },
      {
        title: "Connect with Loved Ones",
        description:
          "Make it a goal to reach out and connect with friends, family, or supportive individuals in your life. This can be through phone calls, video chats, or meeting in person. Social connections play a vital role in maintaining mental well-being.",
      },
      {
        title: "Practice Gratitude",
        description:
          "Set a goal to identify and appreciate things you are grateful for each day. It can be as simple as writing down three things you are thankful for or reflecting on positive experiences. Cultivating gratitude can shift focus towards positivity and improve overall outlook.",
      },
      {
        title: "Engage in Creative Activities",
        description:
          "Allocate time for creative pursuits that bring you joy, such as painting, writing, playing an instrument, or crafting. Engaging in creative activities can provide a sense of fulfillment and serve as a form of self-expression.",
      },
      {
        title: "Prioritize Self-Care",
        description:
          "Make self-care a daily goal by setting aside time for activities that nurture your well-being. This can include taking a relaxing bath, reading a book, practicing self-reflection, or engaging in hobbies that bring you pleasure.",
      },
      {
        title: "Monitor and Challenge Negative Thoughts",
        description:
          "Set a goal to be aware of negative thoughts or self-talk and practice challenging and reframing them. This can involve techniques like cognitive restructuring, positive affirmations, or seeking professional help if needed.",
      },
    ]);
  };

  const deleteGoals = async () => {
    try {
      await AsyncStorage.removeItem("userGoals");
      console.log("Successfully deleted goals.");
      setGoals([]);
      setGoalText("");
    } catch (error) {
      console.error("Error deleting goals:", error);
    }
  };

  return (
    <View>
      {goals.length > 0 ? (
        <TouchableOpacity>
          <View style={styles.container}>
            <Text style={{ fontSize: 18, marginTop: 20, fontWeight: "bold" }}>
              Your Today's Goals:
            </Text>
          </View>

          <View style={styles.container1}>
            <Text>{goalText}</Text>
            {goals.map((goal, index) => (
              <Text key={index}>{goal}</Text>
            ))}
          </View>
        </TouchableOpacity>
      ) : (
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          You have not set any goals today.
        </Text>
      )}

      <Button
        style={styles.button}
        title="Delete Goals"
        onPress={deleteGoals}
      />
      <Button title="View Goals" onPress={handleViewGoals} />

      <ScrollView style={styles.scrollView}>
        {goalInfo.length > 0 && (
          <View>
            {goalInfo.map((goal, index) => (
              <View key={index}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {goal.title}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 10 }}>
                  {goal.description}
                </Text>
                <View style={{ borderBottomWidth: 1, marginVertical: 10 }} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 25,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginStart: 10,
    height: 60,
    marginEnd: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  container1: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 25,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginStart: 10,
    height: 160,
    marginEnd: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  button: {
    backgroundColor: "#FFA500",
  },
  scrollView: {
    marginTop: 20,
    marginBottom: 30,
    maxHeight: 428, // Adjust the maximum height as needed
    padding: 8,
  },
});
export default ViewGoalsButton;
