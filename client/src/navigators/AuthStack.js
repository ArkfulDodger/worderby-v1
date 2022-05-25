import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

// const screens = {
//   Login: {
//     screen: LoginScreen,
//   },
//   Registration: {
//     screen: RegistrationScreen,
//   },
// };

// const AuthStack = createStackNavigator(screens);

// export default createAppContainer(AuthStack);

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;
