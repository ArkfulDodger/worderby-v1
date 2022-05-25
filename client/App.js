import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Button,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LinearGradient from "react-native-linear-gradient";
import useURL from "./src/hooks/useURL";
import useEmulator from "./src/hooks/useEmulator";
import LoginScreen from "./src/screens/LoginScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import GameScreen from "./src/screens/GameScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";

const authScreens = {
  Login: LoginScreen,
  Signup: RegistrationScreen,
};

const appScreens = {
  Game: GameScreen,
};

// NAVIGATION
const navigator = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "Log In Screen",
      headerShown: false,
    },
  }
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmulator, setIsEmulator] = useState(true);
  const [user, setUser] = useState(null);
  const getEmulator = useEmulator;
  const getURL = useURL;

  useEffect(() => {
    getEmulator()
      .then((emulatorBool) => {
        setIsEmulator(emulatorBool);
        return getURL(emulatorBool);
      })
      .then((URL) => {
        console.log("URL:", URL);
        fetch(`${URL}/me`)
          .then((r) =>
            r.ok
              ? r.json().then((userData) => {
                  console.log(Platform.OS, "user:", userData);
                  setUser(userData);
                  setTimeout(() => setIsLoading(false), 1000);
                })
              : console.log(r)
          )
          .catch((error) => console.error(Platform.OS, "error:", error));
      });
  }, []);

  return (
    <View style={styles.fullScreen}>
      <LinearGradient
        colors={["#FFFFFF", "#FFE2CD"]}
        // colors={["red", "green"]}
        style={styles.fullScreen}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* <SafeAreaView style={styles.safeContainer}> */}
        {isLoading ? (
          <LoadingScreen />
        ) : (
          // <LoginScreen />
          // <RegistrationScreen />
          <GameScreen user={user} isEmulator={isEmulator} />
        )}
        {/* </SafeAreaView> */}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;
// export default createAppContainer(navigator);
