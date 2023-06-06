import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";

function CalmHome({navigation}) {
    return (
        <ScrollView>
            <SelectionTile name={"Selection A"} routeTo={'ScreenA'} navigation={navigation}/>
            <SelectionTile name={"Selection B"} routeTo={'ScreenB'} navigation={navigation}/>
        </ScrollView>
    );
}

export default CalmHome;
