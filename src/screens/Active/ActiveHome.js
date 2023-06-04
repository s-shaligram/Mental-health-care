import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";

function ActiveHome({navigation}) {
    return (
        <ScrollView>
            <SelectionTile name={"Game One"} routeTo={'GameOne'} navigation={navigation}/>
        </ScrollView>
    );
}

export default ActiveHome;
