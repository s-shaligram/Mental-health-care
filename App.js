import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import * as SplashScreen from "expo-splash-screen";
import { Button, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CommonProvider } from "./src/hooks/useGlobalContext";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import LocalNotification from './src/components/Notifications/LocalNotification'
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
  
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

    useEffect(() => {
        //registerForPushNotificationsAsync();
        // Handle incoming notifications while the app is running
    //Notifications.addNotificationReceivedListener(handleNotification);
      }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

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

    return (
        <View
       
            style={{
                flex: 1,
            }}
            onLayout={onLayoutRootView}
        >
            {/* <LocalNotification /> */}
            <CommonProvider>
                <NavigationContainer>
                    <Tabs></Tabs>
                </NavigationContainer>
            </CommonProvider>
        </View>
    );
}
