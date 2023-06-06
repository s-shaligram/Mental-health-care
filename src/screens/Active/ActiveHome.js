import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";

function ActiveHome({navigation}) {
    return (
        <ScrollView>
            <SelectionTile name={"🎲 Calm down game"} routeTo={'GameOne'} navigation={navigation}/>
        </ScrollView>
    );
}

export default ActiveHome;
