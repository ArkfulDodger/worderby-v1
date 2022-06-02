import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeTabs from "../navigators/HomeTabs";
import GameScreen from "../screens/GameScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import EditUserProfileScreen from "../screens/EditUserProfileScreen";
import StartNewGameScreen from "../screens/StartNewGameScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BlockListScreen from "../screens/BlockListScreen";
import FriendsListScreen from "../screens/FriendsListScreen";
import FriendProfileScreen from "../screens/FriendProfileScreen";
import useFadeSlide from "../hooks/useFadeSlide";

const Stack = createStackNavigator();

function HomeStack() {
  const forSlide = useFadeSlide();

  return (
    <NavigationContainer theme={{ colors: { background: "transparent" } }}>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Group screenOptions={{ cardStyleInterpolator: forSlide }}>
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen
            name="EditUserProfile"
            component={EditUserProfileScreen}
          /> */}
          {/* <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="BlockList" component={BlockListScreen} /> */}
          <Stack.Screen name="Friends" component={FriendsListScreen} />
          {/* <Stack.Screen name="FriendProfile" component={FriendProfileScreen} /> */}
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            cardOverlayEnabled: true,
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen
            name="StartNewGame"
            component={StartNewGameScreen}
            // options={{ presentation: "modal" }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
