import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import {  Linking, Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default async function schedulePushNotification() {
  const otpnum = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  global.otp = otpnum;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder! 📬",
      body: 'You have 2 tasks due today! ',
      data: { data: otpnum },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  console.log('token at start', token); 
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "No Notification Permission",
        "please goto setting and on notification permission manual",
        [
          { text: "cancel", onPress: () => console.log("cancel") },
          { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
        ],
        { cancelable: false }
      );
      return;
    }
//    if (finalStatus !== 'granted') {
//      alert('Failed to get push token for push notification!');
//      return;
//    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}