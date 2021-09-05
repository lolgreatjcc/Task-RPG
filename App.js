import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image, 
  TouchableOpacity
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BottomTabBar from "./assets/components/tabBar";

import CalendarScreen from "./assets/screens/p1_calender";
import AddtionScreen from "./assets/screens/p5_additionoftask";
import AchievementScreen from "./assets/screens/p4_monsterAchievements";

import TaskScreen from "./assets/screens/p2_task";
import DurationScreen from "./assets/screens/p2s_taskDuration";
import CompletedScreen from "./assets/screens/p3_completedMonster";

import caldata from "./assets/calendar.json"
import taskdata from "./assets/tasks.json"
import maindata from "./assets/main.json"

global.calendar = caldata;
global.tasks = taskdata;
global.main = maindata;
global.level = 10;
global.attack = 0;
global.days = [new Date()];
global.notif =0;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    global.date= year + '-' + month + '-' + date ;
    
function TaskStack() {
  return (
    <Stack.Navigator
      initialRouteName="TaskScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="DurationScreen" component={DurationScreen} />
      <Stack.Screen name="CompletedScreen" component={CompletedScreen} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false
          }}
          tabBar={(props) => <BottomTabBar {...props} />}
        >          
          <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
          <Tab.Screen name="TaskStack" component={TaskStack} />
          <Tab.Screen name="AddtionScreen" component={AddtionScreen} />
          <Tab.Screen name="AchievementScreen" component={AchievementScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
