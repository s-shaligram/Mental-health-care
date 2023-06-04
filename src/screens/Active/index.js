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
      <Text style={styles.text}>Hello Ghanashyam</Text>
      <Text style={styles.text}>Count: {count}</Text>
      <TouchableOpacity onPress={incrementCount} style={styles.button}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}
