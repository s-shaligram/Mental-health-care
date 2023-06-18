// import { NavigationContainer } from "@react-navigation/native";
// import Tabs from "./navigation/tabs";
// import * as SplashScreen from "expo-splash-screen";
// import { StyleSheet, Text, View } from "react-native";
// import React, { useCallback, useEffect, useState } from "react";

// SplashScreen.preventAutoHideAsync();

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         // Tell the application to render
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//       onLayout={onLayoutRootView}
//     >
//       <NavigationContainer>
//         <Tabs></Tabs>
//       </NavigationContainer>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "red",
//     // flexDirection: "row",
//     // alignItems: "center",
//     // justifyContent: "center",
//     // marginVertical: 5,
//   },
// });
// App.js

import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import GoalSettingScreen from "./src/screens/GoalSetting/GoalSettingScreen";
import store from "./redux/store";
import { setGoals } from "./redux/actions";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showGoalSetting, setShowGoalSetting] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onFinishGoalSetting = useCallback((userGoals) => {
    if (userGoals) {
      store.dispatch(setGoals(userGoals));
    }
    setShowGoalSetting(false);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
      onLayout={onLayoutRootView}
    >
      <Provider store={store}>
        {showGoalSetting ? (
          <GoalSettingScreen onFinishGoalSetting={onFinishGoalSetting} />
        ) : (
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        )}
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
