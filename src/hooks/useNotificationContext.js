import React, { createContext, useContext, useState,useEffect } from "react";
import { View, Button } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {

    const [notificationIdentifire, setNotificationIdentifire] = useState(null)
    const [mySheduler,setMyShedular] = useState(null)
    const [notificationData,setNotificationData] = useState([]);


useEffect(() => {
    console.log("Notification Service mounted..")
    registerForPushNotificationsAsync()
    Notifications.addNotificationReceivedListener(handleNotification);

}, [])


    const registerForPushNotificationsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        console.log("inside permisssion.....")
        if (status !== 'granted') {
            console.log('Notification permissions denied!');
            return;
        }
        // Save the device's push notification token for later use
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Notification token---------->:', token);
    }



         const scheduleNotification = async (activityKey,title,body,callAfterIn)=> {
         console.log("Getting called.....!")
         saveNotification(activityKey,title,body,callAfterIn)
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: title,
                    body: body,
                   
                },
                trigger: {
                    seconds: callAfterIn, // Delay in seconds before showing the notification
                },
            });
        } 


    function handleNotification(notification) {
        console.log("Inside Hnadle");
        console.log("Identifire:")
        console.log(notification.request.identifier)
        console.log("State")
        console.log(notificationIdentifire)
        console.log(notification.request.identifier!=notificationIdentifire)

        
        if(notification.request.identifier!=notificationIdentifire){
        console.log('Received notification____>:', notification);   
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
        console.log("Before set")
        console.log(notification.request.identifier)
        setNotificationIdentifire(notification.request.identifier)
    }
    else{
        console.log("I'm here in else")
    }
        // Handle the notification as per your app's logic
    }


    const saveNotification = async (activityKey,title,body,callAfterIn) =>{
        try{
            const newNotification = {
                id: Date.now().toString,
                activityKey:activityKey,
                title:title,
                body:body,
                callAfterIn:callAfterIn
            }
            const updatedData= [...notificationData,newNotification]
            await   AsyncStorage.setItem('notification_data',JSON.stringify(updatedData));
            setNotificationData(updatedData);

        }
        catch(error){
            console.log("Error",error)
        }
    }

    const deleteNotification = async (notificationId)=>{
        try{
            let updatedData = notificationData.filter((item.id!=notificationId))
            await AsyncStorage.setItem('notification_data',JSON.stringify(updatedData));
            setNotificationData(updatedData);

        }
        catch(error){
            console.log("Error in notification deleting..")
        }
    }

    const loadNotification = async () =>{
        try{
            const allNotifications=AsyncStorage.getItem('notification_data')
            if (allNotifications!=null){
                setNotificationData(allNotifications);
            } 
        }
        catch(error){

        }
    };


    return (
        <NotificationContext.Provider
            value={{  
             registerForPushNotificationsAsync,
             scheduleNotification,
             notificationIdentifire


            }}
        >


            {children }
        </NotificationContext.Provider>


    );



}

export default NotificationProvider;