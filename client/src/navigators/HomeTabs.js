import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import RankingsTabs from "./RankingsTabs";
import FriendDashScreen from "../screens/FriendDashScreen";
import FriendsListScreen from "../screens/FriendsListScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

const Tab = createMaterialTopTabNavigator();

const HomeTabsScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Home" tabBarPosition="bottom">
        {/* <Tab.Screen name="Rankings" component={RankingsTabs} /> */}
        <Tab.Screen name="User Profile" component={UserProfileScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Friends" component={FriendsListScreen} />
        {/* <Tab.Screen name="FriendDash" component={FriendDashScreen} /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeTabsScreen;
