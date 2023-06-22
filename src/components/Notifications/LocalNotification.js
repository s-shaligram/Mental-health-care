
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const LocalNotification = () => {


    useEffect(() => {
        registerForPushNotificationsAsync();
        // Handle incoming notifications while the app is running
        Notifications.addNotificationReceivedListener(handleNotification);

        return () => {
            // Clean up the listeners when the component unmounts
            Notifications.removeNotificationReceivedListener(handleNotification);
        };
    }, []);
    å


     const registerForPushNotificationsAsync  = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            console.log('Notification permissions denied!');
            return;
        }
        // Save the device's push notification token for later use
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Notification token:', token);
    }

    async function scheduleNotification() {
        console.log("Getting called.....!")
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'My Notification',
                body: 'This is my local notification!',
            },
            trigger: {
                seconds: 5, // Delay in seconds before showing the notification
            },
        });
    }

    function handleNotification(notification) {
        console.log('Received notification:', notification);

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        Notifications.presentNotificationAsync({
            title: notification.request.content.title,
            body: notification.request.content.body,
            data: notification.request.content.data,
        });
        // Handle the notification as per your app's logic
    }



}



export default {LocalNotification};