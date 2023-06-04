import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeHome from "./HomeHome";
import TrackMedicine from "./TrackMedicine";

const Stack = createStackNavigator();

function Home() {
    return (
        <Stack.Navigator initialRoutName="HomeHome">
            <Stack.Screen
                name="HomeHome"
                component={HomeHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TrackMedicine"
                component={TrackMedicine}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Home;
