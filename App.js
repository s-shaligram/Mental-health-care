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
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Tabs from "./navigation/tabs";
import GoalSettingScreen from "./src/screens/GoalSetting/GoalSettingScreen";
import store from "./redux/store";
import { setGoals } from "./redux/actions";
import {CommonProvider} from "./src/hooks/useGlobalContext";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [userGoals, setUserGoals] = useState(null);

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
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
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
    bottom: 0,
    left: 0,
    right: 0,
    height: "75%", // Occupies 3/4 of the screen
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
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
