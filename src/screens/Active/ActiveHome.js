import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";

function ActiveHome({navigation}) {
    return (
        <ScrollView>
            <SelectionTile name={"🎲 Calm down game"} routeTo={'GameOne'} navigation={navigation}/>
            <SelectionTile name={"View Daily Goals"} routeTo={'ViewGoalsButton'} navigation={navigation}/>
        </ScrollView>
    );
}

export default ActiveHome;
