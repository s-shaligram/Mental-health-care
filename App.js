import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import React, {useCallback, useEffect, useState} from 'react';
import { Text,View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';


// dummy change

SplashScreen.preventAutoHideAsync();

export default function App() {
  
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
    
        await new Promise(resolve => setTimeout(resolve, 2000));
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
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.

      await SplashScreen.hideAsync();
      
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // else {

  //   return (
  //     <NavigationContainer>
  //       <Tabs></Tabs>
  //     </NavigationContainer>
  // );
  // }



  return (

    <View 
    style={{ flex: 1 }}
    onLayout={onLayoutRootView}>
    
      
    {/* <Text>SplashScreen Demo! 👋</Text> */}

    <NavigationContainer>
      <Tabs></Tabs> 
    </NavigationContainer>

    
    </View>
    


  );
}
