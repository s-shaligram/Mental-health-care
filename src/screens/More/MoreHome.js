import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";

function MoreHome({navigation}) {
    return (
        <ScrollView>
            <SelectionTile name={"📍 View nearby medical centers"} routeTo={'NearByMedicalCenter'} navigation={navigation}/>
            <SelectionTile name={"🔔 View Notifications"} routeTo={'Notifications'} navigation={navigation}/>
            
        </ScrollView>
    );
}

export default MoreHome;