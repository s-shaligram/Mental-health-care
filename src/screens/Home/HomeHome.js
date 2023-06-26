import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import MoodTracker from "../../components/MoodTrack/moodtracker";
import MedicineTracker from "../../components/MedicineTrack/MedicineTracker";
import {useGlobalContext} from "../../hooks/useGlobalContext";
import SleepTracker from "../../components/SleepTrack/SleepTracker";

function HomeHome({navigation}) {
    const {medicineTrackerEnabled, sleepTrackerEnabled, theme} = useGlobalContext();

    return (
        <ScrollView>
            {sleepTrackerEnabled && <View style={{...styles.container2, backgroundColor: theme.background}}>
                <SleepTracker/>
            </View>}
            <View style={styles.container}>
                <MoodTracker/>
            </View>
            {medicineTrackerEnabled && <View style={{...styles.container2, backgroundColor: theme.background}}>
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
