import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setGoals } from "../././../../redux/actions";

const GoalSettingScreen = ({ onFinishGoalSetting }) => {
  const [goals, setGoals] = useState("");

  const handleFinish = () => {
    onFinishGoalSetting(goals);
  };

  const handleClose = () => {
    onFinishGoalSetting(null);
  };

  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Set Your Daily Goals</Text>
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Enter your goals..."
  //         onChangeText={(text) => setGoals(text)}
  //         value={goals}
  //         multiline
  //       />
  //       <TouchableOpacity style={styles.button} onPress={handleFinish}>
  //         <Text style={styles.buttonText}>Finish</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.Button} onPress={handleClose}>
  //         <Text style={styles.buttonText}>Close</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   // Styles for the goal setting screen
  //   container: {
  //     flex: 1,
  //     backgroundColor: "#fff",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: "bold",
  //     marginBottom: 20,
  //   },
  //   input: {
  //     width: "80%",
  //     height: 40,
  //     borderColor: "#ccc",
  //     borderWidth: 1,
  //     borderRadius: 5,
  //     paddingHorizontal: 10,
  //     marginBottom: 20,
  //   },
  //   button: {
  //     backgroundColor: "#6c63ff",
  //     paddingVertical: 10,
  //     paddingHorizontal: 20,
  //     borderRadius: 5,
  //   },
  //   buttonText: {
  //     color: "#fff",
  //     fontSize: 16,
  //     fontWeight: "bold",
  //   },
  // });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Set Your Daily Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your goal"
          value={goals}
          onChangeText={setGoals}
        />
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "75%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    alignItems: "flex-end",
  },
  closeButton: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6c63ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default connect(null, { setGoals })(GoalSettingScreen);
