import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SelectionTile from "../../components/SelectionTile";
import MoodTracker from "../../components/MoodTrack/moodtracker";

function HomeHome({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <MoodTracker />
      </View>
      <SelectionTile
        name={"Track my medicine"}
        routeTo={"TrackMedicine"}
        navigation={navigation}
      />
    </ScrollView>
  );
}

export default HomeHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFA500",
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    // marginVertical: 5,
  },
});
