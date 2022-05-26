import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeTabs from "../navigators/HomeTabs";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <NavigationContainer theme={{ colors: { background: "transparent" } }}>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Rankings" component={RankingsTabs} />
            <Stack.Screen name="FriendDash" component={FriendDashScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
