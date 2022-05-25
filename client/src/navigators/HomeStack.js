import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import RankingsTabs from "../navigators/RankingsTabs";
import FriendDashScreen from "../screens/FriendDashScreen";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rankings" component={RankingsTabs} />
        <Stack.Screen name="FriendDash" component={FriendDashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
