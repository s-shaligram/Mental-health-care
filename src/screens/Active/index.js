import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GameOne from "./GameOne";
import ActiveHome from "./ActiveHome";
const Stack = createStackNavigator();

function Active() {
    return (
        <Stack.Navigator initialRoutName="ActiveHome">
            <Stack.Screen
                name="ActiveHome"
                component={ActiveHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="GameOne"
                component={GameOne}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Active;
