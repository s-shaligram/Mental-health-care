import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        
        
        await new Promise(resolve => setTimeout(resolve, 10000));

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
        await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
      <View 
      style= { {
        flex: 1,
       } }
       onLayout={onLayoutRootView}>
        <NavigationContainer>
        <Tabs></Tabs>
        </NavigationContainer>
      </View>
  );
}
