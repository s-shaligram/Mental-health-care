import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import MoodTracker from "../../components/MoodTrack/moodtracker";
import MedicineTracker from "../../components/MedicineTrack/MedicineTracker";
import {useGlobalContext} from "../../hooks/useGlobalContext";

function HomeHome({navigation}) {
    const {medicineTrackerEnabled} = useGlobalContext();

    return (
        <ScrollView>
            <View style={styles.container}>
                <MoodTracker/>
            </View>
            {medicineTrackerEnabled && <View style={styles.container2}>
                <MedicineTracker/>
            </View>}
        </ScrollView>
    );
}

export default HomeHome;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFA500",
    },
    container2: {
        // backgroundColor: "#FFA500",
    },
});
