// import React from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";

// function Home() {
//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.line} />
//         <Text style={styles.title}>Hi</Text>
//         <View style={styles.line} />
//       </View>

//       <View style={styles.container}>
//         <View style={styles.line} />
//         <Text style={styles.title}>Hello</Text>
//         <View style={styles.line} />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 10,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#ccc",
//     marginHorizontal: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#555",
//     marginHorizontal: 10,
//   },
// });

// export default Home;
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

export default function Home() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <TouchableOpacity onPress={incrementCount} style={styles.button}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}
