import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NearByMedicalCenter from "../../components/nearByMedicalCenter";
import MoreHome from "./MoreHome";
const Stack = createStackNavigator();

function More() {
    return (
        <Stack.Navigator initialRoutName="MoreHome">
            <Stack.Screen
                name="MoreHome"
                component={MoreHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NearByMedicalCenter"
                component={NearByMedicalCenter}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default More;
