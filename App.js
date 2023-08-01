// import React, { useCallback, useEffect, useState, useContext } from "react";
// import {
//   StyleSheet,
//   View,
//   Animated,
//   Easing,
//   TouchableOpacity,
// } from "react-native";
// import * as SplashScreen from "expo-splash-screen";
// import { Provider } from "react-redux";
// import {
//   NavigationContainer,
//   DarkTheme,
//   DefaultTheme,
// } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import moment from "moment";
// import Tabs from "./navigation/tabs";
// import GoalSettingScreen from "./src/screens/GoalSetting/GoalSettingScreen";
// import store from "./redux/store";
// import { setGoals } from "./redux/actions";
// import { CommonProvider } from "./src/hooks/useGlobalContext";
// import { EventRegister } from "react-native-event-listeners";
// import themeContext from "./styles/themeContext";
// import darkMode from "./styles/darkMode";
// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
// import LocalNotification from "./src/components/Notifications/LocalNotification";
// import NotificationModal from "./src/screens/GoalSetting/GoalNotificationModal";
// import {
//   NotificationProvider,
//   NotificationContext,
// } from "./src/hooks/useNotificationContext";
// SplashScreen.preventAutoHideAsync();

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);
//   const [showGoalSetting, setShowGoalSetting] = useState(true);
//   const [animation, setAnimation] = useState(new Animated.Value(0));
//   const [userGoals, setUserGoals] = useState(null);
//   const [showNotificationModal, setShowNotificationModal] = useState(false);
//   const [receivedEndOfDayNotification, setReceivedEndOfDayNotification] =
//     useState(false);
//   const [userInteractedWithNotification, setUserInteractedWithNotification] =
//     useState(false);
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

//     prepare().then();
//   }, []);

//   const loadGoalsFromStorage = async () => {
//     try {
//       const savedGoals = await AsyncStorage.getItem("userGoals");
//       if (savedGoals) {
//         setUserGoals(JSON.parse(savedGoals));
//       }
//     } catch (error) {
//       console.error("Error loading goals from storage:", error);
//     }
//   };

//   useEffect(async () => {
//     //registerForPushNotificationsAsync();
//     loadGoalsFromStorage();
//     console.log("App mounted.....");
//   }, []);

//   const saveGoalsToStorage = async (goals, checkedItems) => {
//     try {
//       const data = {
//         goals: goals,
//         checkedItems: checkedItems,
//       };
//       await AsyncStorage.setItem("userGoals", JSON.stringify(data));
//     } catch (error) {
//       console.error("Error saving goals to storage:", error);
//     }
//   };

//   const checkGoalSettingStatus = async () => {
//     try {
//       const lastSetDate = await AsyncStorage.getItem("lastSetDate");
//       console.log(lastSetDate);
//       if (lastSetDate && moment().isSame(moment(lastSetDate), "day")) {
//         setShowGoalSetting(false);
//       } else {
//         setShowGoalSetting(true);
//       }
//     } catch (error) {
//       console.error("Error checking goal setting status:", error);
//     }
//   };

//   const onFinishGoalSetting = useCallback((goals, checkedItems) => {
//     if (goals) {
//       store.dispatch(setGoals(goals));
//       setUserGoals(goals);
//       saveGoalsToStorage(goals, checkedItems);
//       AsyncStorage.setItem("lastSetDate", moment().format());
//     }
//     animateDrawer(false); // Close the drawer after goal setting
//   }, []);

//   const animateDrawer = (open) => {
//     Animated.timing(animation, {
//       toValue: open ? 1 : 0,
//       duration: 300,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start(() => {
//       setShowGoalSetting(open);
//     });
//   };

//   const toggleDrawer = () => {
//     animateDrawer(!showGoalSetting);
//   };

//   const cancelGoalSetting = () => {
//     animateDrawer(false);
//   };

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       // Hide the splash screen
//       await SplashScreen.hideAsync();
//       // Show the goal setting drawer if needed
//       checkGoalSettingStatus();
//       animateDrawer(showGoalSetting);
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }
//   const drawerTranslateY = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [500, 0],
//   });

//   return (
//     <NotificationProvider>
//       <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//         <Provider store={store}>
//           <CommonProvider>
//             {/* <themeContext.Provider value={darkMode === true ? darkMode.dark : darkMode.light}>
//                     <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}> */}
//             {/*<themeContext.Provider value={theme ? darkMode.dark : darkMode.light}>*/}
//             <NavigationContainer>
//               <Tabs></Tabs>
//             </NavigationContainer>
//             {/*</themeContext.Provider>*/}
//           </CommonProvider>
//           <TouchableOpacity style={styles.drawerHandle} onPress={toggleDrawer}>
//             <View style={styles.handleBar} />
//           </TouchableOpacity>
//           {showGoalSetting && (
//             <Animated.View
//               style={[
//                 StyleSheet.absoluteFill,
//                 styles.drawerContainer,
//                 { transform: [{ translateY: drawerTranslateY }] },
//               ]}
//             >
//               <GoalSettingScreen
//                 onFinishGoalSetting={onFinishGoalSetting}
//                 onCancelGoalSetting={cancelGoalSetting}
//                 setShowGoalSetting={animateDrawer}
//               />
//             </Animated.View>
//           )}
//         </Provider>
//         {receivedEndOfDayNotification && userInteractedWithNotification && (
//           <NotificationModal
//             visible={showNotificationModal}
//             onClose={() => setShowNotificationModal(false)}
//           />
//         )}
//       </View>
//     </NotificationProvider>
//   );
// }

// const styles = StyleSheet.create({
//   drawerContainer: {
//     position: "absolute",
//     height: "78%",
//     backgroundColor: "white",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//   },
//   drawerHandle: {
//     position: "absolute",
//     top: 10,
//     left: "50%",
//     width: 40,
//     height: 5,
//     marginTop: -2.5,
//     backgroundColor: "gray",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   handleBar: {
//     width: 20,
//     height: 3,
//     backgroundColor: "white",
//     borderRadius: 2,
//   },
// });
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
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
import NotificationModal from "./src/screens/GoalSetting/GoalNotificationModal";
import {
  NotificationProvider,
  NotificationContext,
} from "./src/hooks/useNotificationContext";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showGoalSettingModal, setShowGoalSettingModal] = useState(false);
  const [userGoals, setUserGoals] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [receivedEndOfDayNotification, setReceivedEndOfDayNotification] =
    useState(false);
  const [userInteractedWithNotification, setUserInteractedWithNotification] =
    useState(false);

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
    //registerForPushNotificationsAsync();
    loadGoalsFromStorage();
    console.log("App mounted.....");
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
        setShowGoalSettingModal(true);
      } else {
        setShowGoalSettingModal(false);
      }
    } catch (error) {
      console.error("Error checking goal setting status:", error);
    }
  };

  const onFinishGoalSetting = (goals, checkedItems) => {
    if (goals) {
      store.dispatch(setGoals(goals));
      setUserGoals(goals);
      saveGoalsToStorage(goals, checkedItems);
      AsyncStorage.setItem("lastSetDate", moment().format());
    }
    setShowGoalSettingModal(false);
  };

  const cancelGoalSetting = () => {
    setShowGoalSettingModal(false);
  };

  const onCancelGoalSetting = () => {
    setShowGoalSettingModal(false);
  };
  const onBackgroundPress = () => {
    // Close the GoalSettingScreen modal when tapping outside the text fields and floating button
    Keyboard.dismiss();
    onCancelGoalSetting();
  };

  const onLayoutRootView = async () => {
    if (appIsReady) {
      // Hide the splash screen
      // await SplashScreen.hideAsync();
      // Show the goal setting modal if needed
      checkGoalSettingStatus();
    }
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <NotificationProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Provider store={store}>
          <CommonProvider>
            <NavigationContainer>
              <Tabs />
            </NavigationContainer>
          </CommonProvider>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setShowGoalSettingModal(true)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Add hitSlop to reduce the touchable area
          >
            {/* Icon for the floating button */}
          </TouchableOpacity>
          <Modal
            visible={showGoalSettingModal}
            animationType="slide"
            transparent={true}
            onRequestClose={onCancelGoalSetting}
          >
            <TouchableWithoutFeedback onPress={onBackgroundPress}>
              <View style={styles.modalContainer}>
                <GoalSettingScreen
                  onFinishGoalSetting={onFinishGoalSetting}
                  onCancelGoalSetting={onCancelGoalSetting}
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </Provider>
        {receivedEndOfDayNotification && userInteractedWithNotification && (
          <NotificationModal
            visible={showNotificationModal}
            onClose={() => setShowNotificationModal(false)}
          />
        )}
      </View>
    </NotificationProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  floatingButton: {
    position: "absolute",
    bottom: 60,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Add zIndex property to make the floating button above other components
  },
  // Other styles remain the same...
});
