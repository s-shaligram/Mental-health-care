import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomeHome from "./HomeHome";
import MedicineTracker from "../../components/MedicineTrack/MedicineTracker";

const Stack = createStackNavigator();

function Home() {
    return (
        <Stack.Navigator initialRoutName="HomeHome">
            <Stack.Screen
                name="HomeHome"
                component={HomeHome}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="TrackMedicine"
                component={MedicineTracker}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default Home;
