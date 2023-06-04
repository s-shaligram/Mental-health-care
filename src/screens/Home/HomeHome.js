import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import SelectionTile from "../../components/SelectionTile";
import MoodTracker from "../../components/MoodTrack/moodtracker";

function HomeHome({navigation}) {
    return (
        <ScrollView>
            <View style={styles.container}><MoodTracker/></View>
            <SelectionTile name={"Selection A"} routeTo={'ScreenA'} navigation={navigation}/>
            <SelectionTile name={"Selection B"} routeTo={'ScreenB'} navigation={navigation}/>
        </ScrollView>
    );
}

export default HomeHome;

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "center",
        // marginVertical: 5,
    }
});
