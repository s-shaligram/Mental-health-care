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


// import React, { useState, useEffect, useContext } from "react";
// import { Text, ScrollView, View, StyleSheet, Switch } from "react-native";
// import { EventRegister } from 'react-native-event-listeners';
// import themeContext from "../../../styles/themeContext";

// function ScreenA() {
//   const theme = useContext(themeContext);

//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     EventRegister.emit('ChangeTheme', darkMode);
//   }, [darkMode]);

//   return (
//     <View style={{ backgroundColor: theme?.background }}>
//       <Text style={{ color: theme?.color }}>Change Theme</Text>
//       <Switch
//         value={darkMode}
//         onValueChange={setDarkMode}
//       />
//     </View>
//   );
// }

// export default ScreenA;

// import React, { useContext } from "react";
// import { Text, View, Switch } from "react-native";
// import themeContext from "./../../../styles/themeContext";

// const ScreenA = () => {
//     const { theme, setTheme } = useContext(themeContext);
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ color: theme === "dark" ? "white" : "black" }}>
//         Change Theme
//       </Text>
//       <Switch
//         value={theme === "dark"}
//         onValueChange={(value) => {
//           setTheme(value ? "dark" : "light");
//         }}
//       />
//     </View>
//   );
// };

// export default ScreenA;
