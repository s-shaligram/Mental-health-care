import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Tabs from "./navigation/tabs";
import GoalSettingScreen from "./src/screens/GoalSetting/GoalSettingScreen";
import store from "./redux/store";
import { setGoals } from "./redux/actions";
import { CommonProvider } from "./src/hooks/useGlobalContext";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./styles/themeContext";
import darkMode from "./styles/darkMode";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import LocalNotification from "./src/components/Notifications/LocalNotification";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [userGoals, setUserGoals] = useState(null);
  // const [theme, setTheme] = useState(false);

  // useEffect(() => {
  //   const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
  //     setTheme(data);
  //     console.log(data);
  //   });
  //
  //   return () => {
  //     EventRegister.removeAllListeners(listener);
  //   };
  // }, [theme]);

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

    prepare().then();
  }, []);

  const loadGoalsFromStorage = async () => {
    try {
      const savedGoals = await AsyncStorage.getItem("userGoals");
      if (savedGoals) {
        setUserGoals(JSON.parse(savedGoals));
      }
    } catch (error) {
      console.error("Error loading goals from storage:", error);
    }
  };

  useEffect(() => {
    loadGoalsFromStorage();
  }, []);

  const saveGoalsToStorage = async (goals, checkedItems) => {
    try {
      const data = {
        goals: goals,
        checkedItems: checkedItems,
      };
      await AsyncStorage.setItem("userGoals", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving goals to storage:", error);
    }
  };

  const checkGoalSettingStatus = async () => {
    try {
      const lastSetDate = await AsyncStorage.getItem("lastSetDate");
      console.log(lastSetDate);
      if (lastSetDate && moment().isSame(moment(lastSetDate), "day")) {
        setShowGoalSetting(true);
      } else {
        setShowGoalSetting(true);
      }
    } catch (error) {
      console.error("Error checking goal setting status:", error);
    }
  };

  useEffect(() => {
    checkGoalSettingStatus();
  }, []);

  const onFinishGoalSetting = useCallback((goals, checkedItems) => {
    if (goals) {
      store.dispatch(setGoals(goals));
      setUserGoals(goals);
      saveGoalsToStorage(goals, checkedItems);
      AsyncStorage.setItem("lastSetDate", moment().format());
    }
    animateDrawer(false); // Close the drawer after goal setting
  }, []);

  const animateDrawer = (open) => {
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setShowGoalSetting(open);
    });
  };

  const toggleDrawer = () => {
    animateDrawer(!showGoalSetting);
  };

  const cancelGoalSetting = () => {
    animateDrawer(false);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
      // Show the goal setting drawer if needed
      checkGoalSettingStatus();
      animateDrawer(showGoalSetting);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const drawerTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <CommonProvider>
          {/* <themeContext.Provider value={darkMode === true ? darkMode.dark : darkMode.light}>
                    <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}> */}
          {/*<themeContext.Provider value={theme ? darkMode.dark : darkMode.light}>*/}
          <NavigationContainer>
            <Tabs></Tabs>
          </NavigationContainer>
          {/*</themeContext.Provider>*/}
        </CommonProvider>
        <TouchableOpacity style={styles.drawerHandle} onPress={toggleDrawer}>
          <View style={styles.handleBar} />
        </TouchableOpacity>
        {showGoalSetting && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.drawerContainer,
              { transform: [{ translateY: drawerTranslateY }] },
            ]}
          >
            <GoalSettingScreen
              onFinishGoalSetting={onFinishGoalSetting}
              onCancelGoalSetting={cancelGoalSetting}
              setShowGoalSetting={animateDrawer}
            />
          </Animated.View>
        )}
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    position: "absolute",
    height: "78%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  drawerHandle: {
    position: "absolute",
    top: 10,
    left: "50%",
    width: 40,
    height: 5,
    marginTop: -2.5,
    backgroundColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  handleBar: {
    width: 20,
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
  },
});

// useEffect(() => {
//     //registerForPushNotificationsAsync();
//     // Handle incoming notifications while the app is running
// //Notifications.addNotificationReceivedListener(handleNotification);
//   }, []);

//     async function registerForPushNotificationsAsync() {
//         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//         if (status !== 'granted') {
//           console.log('Notification permissions denied!');
//           return;
//         }
//         // Save the device's push notification token for later use
//         const token = (await Notifications.getExpoPushTokenAsync()).data;
//         console.log('Notification token:', token);
//       }

//       async function scheduleNotification() {
//         console.log("Getting called.....!")
//         await Notifications.scheduleNotificationAsync({
//           content: {
//             title: 'My Notification',
//             body: 'This is my local notification!',
//           },
//           trigger: {
//             seconds: 5, // Delay in seconds before showing the notification
//           },
//         });
//       }

//        function handleNotification(notification) {
//     console.log('Received notification:', notification);

//     Notifications.setNotificationHandler({
//         handleNotification: async () => ({
//           shouldShowAlert: true,
//           shouldPlaySound: true,
//           shouldSetBadge: true,
//         }),
//       });

//       Notifications.presentNotificationAsync({
//         title: notification.request.content.title,
//         body: notification.request.content.body,
//         data: notification.request.content.data,
//       });
//     // Handle the notification as per your app's logic
//   }
