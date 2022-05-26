import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import YourRankingsScreen from "../screens/YourRankingsScreen";
import FriendRankingsScreen from "../screens/FriendRankingsScreen";
import GlobalRankingsScreen from "../screens/GlobalRankingsScreen";

const Tab = createMaterialTopTabNavigator();

const HomeTabsScreen = (props) => {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <Tab.Navigator
      initialRouteName="YourRankings"
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
      }}
    >
      <Tab.Screen name="YourRankings" component={YourRankingsScreen} />
      <Tab.Screen name="FriendRankings" component={FriendRankingsScreen} />
      <Tab.Screen name="GlobalRankings" component={GlobalRankingsScreen} />
    </Tab.Navigator>
    // </SafeAreaView>
  );
};

export default HomeTabsScreen;
