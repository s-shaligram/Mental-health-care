import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notificationIdentifire, setNotificationIdentifire] = useState(null);
  const [mySheduler, setMyShedular] = useState(null);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(handleNotification);
    loadNotification();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //console.log("inside permisssion.....")
    if (status !== "granted") {
      console.log("Notification permissions denied!");
      return;
    }
    // Save the device's push notification token for later use
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Notification token---------->:", token);
  };

  const scheduleNotification = async (
    activityKey,
    title,
    body,
    callAfterIn
  ) => {
    saveNotification(activityKey, title, body, callAfterIn);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        seconds: callAfterIn, // Delay in seconds before showing the notification
      },
    });
  };

  function handleNotification(notification) {
    console.log(notification.request.identifier);
    console.log(notificationIdentifire);
    console.log(notification.request.identifier != notificationIdentifire);

    if (notification.request.identifier != notificationIdentifire) {
      console.log("Received notification____>:", notification);
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
      // Trigger the handleUserResponse function with the notification identifier
      handleUserResponse(notification.request.identifier);

      console.log("Before set");
      console.log(notification.request.identifier);
      setNotificationIdentifire(notification.request.identifier);
    } else {
      console.log("I'm here in else");
    }
  }

  const saveNotification = async (activityKey, title, body, callAfterIn) => {
    const newNotification = {
      id: new Date().getTime(),
      activityKey: activityKey,
      title: title,
      body: body,
      callAfterIn: callAfterIn,
      currentDate: formatDate(new Date()),
    };
    const updatedData = [...notificationData, newNotification];
    await AsyncStorage.setItem("notification_data", JSON.stringify(updatedData))
      .then(() => {
        setNotificationData(updatedData);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}:${month}:${day}:${hours}:${minutes}`;
  };

  const deleteNotification = async (notificationId) => {
    try {
      let updatedData = notificationData.filter(
        (item) => item.id != notificationId
      );
      await AsyncStorage.setItem(
        "notification_data",
        JSON.stringify(updatedData)
      );
      setNotificationData(updatedData);
    } catch (error) {
      console.log("Error in notification deleting..", error);
    }
  };

  const loadNotification = async () => {
    try {
      const allNotifications = await AsyncStorage.getItem("notification_data");
      console.log(allNotifications);
      if (allNotifications != null) {
        setNotificationData(JSON.parse(allNotifications));
      }
    } catch (error) {}
  };

  const clearNotificationList = async () => {
    try {
      updatedData = [];
      const allNotifications = await AsyncStorage.setItem(
        "notification_data",
        JSON.stringify(updatedData)
      );
      setNotificationData(updatedData);
    } catch (error) {
      console.log("delete all Error", error);
    }
  };

  const handleUserResponse = (response) => {
    // Store the user's response (completed or not completed) in AsyncStorage
    AsyncStorage.setItem("dailyGoalsCompleted", response);
  };

  const checkUserResponse = async () => {
    try {
      const response = await AsyncStorage.getItem("dailyGoalsCompleted");
      // Handle the user's response and display it as needed
      console.log("User responded:", response);
    } catch (error) {
      console.error("Error retrieving user response:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        registerForPushNotificationsAsync,
        scheduleNotification,
        notificationIdentifire,
        loadNotification,
        notificationData,
        deleteNotification,
        clearNotificationList,
        handleUserResponse,
        checkUserResponse,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
