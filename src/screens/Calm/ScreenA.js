import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, View, StyleSheet, Switch } from "react-native";
import { EventRegister } from 'react-native-event-listeners';
import themeContext from "../../../styles/themeContext";

function ScreenA() {
    
    const theme = useContext(themeContext);

    const [darkMode, setDarkMode] = useState(false);

    return (
      <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >

        <View style={{backgroundColor:theme.backgroundColor,
          borderRadius: 10,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",}}>
            <Text style={{color:theme.color, marginRight: 8}}>Change Theme</Text>
            <Switch
            value={darkMode}
            onValueChange={(value) => {
                setDarkMode(value);
                EventRegister.emit('ChangeTheme', value);
            }}
            />
        </View>
        </View>
    );
}

export default ScreenA;


