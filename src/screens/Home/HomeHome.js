import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import MoodTracker from "../../components/MoodTrack/moodtracker";
import MedicineTracker from "../../components/MedicineTrack/MedicineTracker";

function HomeHome({navigation}) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <MoodTracker/>
            </View>
            <View style={styles.container}>
                <MedicineTracker/>
            </View>
        </ScrollView>
    );
}

export default HomeHome;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFA500",
    },
});
