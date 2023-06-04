import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenA from "../Calm/ScreenA";
import ScreenB from "../Calm/ScreenB";
import HomeHome from "./HomeHome";

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
                name="ScreenA"
                component={ScreenA}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ScreenB"
                component={ScreenB}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Home;
