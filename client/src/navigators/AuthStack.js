import React, { useContext, useEffect } from "react";
import { View, Animated } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import Title from "../components/Title";
import useFadeSlide from "../hooks/useFadeSlide";

const Stack = createStackNavigator();

function AuthStack() {
  const forSlide = useFadeSlide();

  return (
    <NavigationContainer theme={{ colors: { background: "transparent" } }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Title />
        </View>
        <View style={{ height: 430 }}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: forSlide,
              presentation: "modal",
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </Stack.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}

export default AuthStack;
