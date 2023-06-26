import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeTheme from "./ChangeTheme";
import ScreenB from "./ScreenB";
import CalmHome from "./CalmHome";
const Stack = createStackNavigator();

function Calm() {
  return (
    <Stack.Navigator initialRoutName="CalmHome">
      <Stack.Screen
        name="CalmHome"
        component={CalmHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeTheme"
        component={ChangeTheme}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ScreenB"
        component={ScreenB}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Calm;
