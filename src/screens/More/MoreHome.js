import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";

function MoreHome({navigation}) {
    return (
        <ScrollView>
            <SelectionTile name={"Near by medical centers"} routeTo={'NearByMedicalCenter'} navigation={navigation}/>
        </ScrollView>
    );
}

export default MoreHome;