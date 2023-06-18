// import React, { useState } from "react";
// import { Button, Text, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ViewGoalsButton = () => {
//   const [goals, setGoals] = useState([]);

//   const retrieveGoals = async () => {
//     try {
//       const goalsString = await AsyncStorage.getItem("userGoals");
//       if (goalsString !== null) {
//         const parsedGoals = JSON.parse(goalsString) || [];
//         setGoals(parsedGoals);
//       } else {
//         console.log("No goals found.");
//       }
//     } catch (error) {
//       console.error("Error retrieving goals:", error);
//     }
//   };

//   const testAsyncStorage = async () => {
//     try {
//       await AsyncStorage.setItem("testKey", "testValue");
//       const value = await AsyncStorage.getItem("testKey");
//       console.log("Retrieved value:", value);
//     } catch (error) {
//       console.error("Error storing/retrieving data:", error);
//     }
//   };

//   const handleViewGoals = () => {
//     retrieveGoals();
//   };

//   return (
//     <View>
//       <Button title="View Goals" onPress={handleViewGoals} />
//       <Button title="Test Goals" onPress={testAsyncStorage} />
//       {goals.length > 0 ? (
//         <View>
//           <Text>Goals:</Text>
//           {goals.map((goal, index) => (
//             <Text key={index}>{goal}</Text>
//           ))}
//         </View>
//       ) : (
//         <Text>No goals found.</Text>
//       )}
//     </View>
//   );
// };

// export default ViewGoalsButton;
import React from "react";
import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewGoalsButton = () => {
  const retrieveGoals = async () => {
    try {
      const goals = await AsyncStorage.getItem("userGoals");
      if (goals !== null) {
        console.log("Retrieved goals:", JSON.parse(goals));
      } else {
        console.log("No goals found.");
      }
    } catch (error) {
      console.error("Error retrieving goals:", error);
    }
  };

  // Function to delete a specific item from AsyncStorage
  const deleteItemFromAsyncStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Successfully deleted item with key: ${key}`);
    } catch (error) {
      console.error(`Error deleting item with key: ${key}`, error);
    }
  };

  const handleViewGoals = () => {
    retrieveGoals();
  };

  const deleteGoals = () => {
    deleteItemFromAsyncStorage("userGoals");
  };

  return (
    <View>
      <Button title="View Goals" onPress={handleViewGoals} />
      <Button title="delete Goals" onPress={deleteGoals} />
    </View>
  );
};

export default ViewGoalsButton;
