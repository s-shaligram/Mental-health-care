import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, View, StyleSheet, Switch } from "react-native";
import { EventRegister } from 'react-native-event-listeners';
import themeContext from "../../../styles/themeContext";

function ScreenA() {
    
    const theme = useContext(themeContext);

    const [darkMode, setDarkMode] = useState(false);

    return (
        <View style={{backgroundColor:theme.backgroundColor}}>
            <Text style={{color:theme.color}}>Change Theme</Text>
            <Switch
            value={darkMode}
            onValueChange={(value) => {
                setDarkMode(value);
                EventRegister.emit('ChangeTheme', value);
            }}
            />
        </View>
    );
}

export default ScreenA;


