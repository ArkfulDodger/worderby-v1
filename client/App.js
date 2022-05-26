import "react-native-gesture-handler";
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
import { createStackNavigator } from "react-navigation-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import useURL from "./src/hooks/useURL";
import useEmulator from "./src/hooks/useEmulator";
import LoginScreen from "./src/screens/LoginScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import GameScreen from "./src/screens/GameScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import AuthStack from "./src/navigators/AuthStack";
import HomeStack from "./src/navigators/HomeStack";

export const UserContext = React.createContext();
export const EmulatorContext = React.createContext();
export const UrlContext = React.createContext();

const App = () => {
  // const [isEmulator, setIsEmulator] = useState(true);
  const getEmulator = useEmulator;
  const getURL = useURL;

  const [urlState, setUrlState] = useState("http://localhost:3000");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getEmulator()
      .then((emulatorBool) => {
        // setIsEmulator(emulatorBool);
        urlToUse = getURL(emulatorBool);
        setUrlState(urlToUse);
        return { urlToUse, emulatorBool };
      })
      .then(({ urlToUse: URL, emulatorBool: isEmulator }) => {
        console.log(
          `${Platform.OS} (${isEmulator ? "emulator" : "device"}) URL: ${URL}`
        );
        fetch(`${URL}/me`)
          .then((r) => {
            if (r.ok) {
              r.json().then((userData) => {
                console.log(Platform.OS, "user:", userData);
                setUser(userData);
                setTimeout(() => setIsLoading(false), 1000);
              });
            } else {
              console.log("user not logged in");
              setUser(null);
              setTimeout(() => setIsLoading(false), 1000);
            }
          })
          .catch((error) => console.error(Platform.OS, "error:", error));
      });
  }, []);

  return (
    <UrlContext.Provider value={urlState}>
      <UserContext.Provider value={{ user, setUser }}>
        <SafeAreaProvider>
          <View style={styles.fullScreen}>
            <LinearGradient
              colors={["#FFFFFF", "#FFE2CD"]}
              style={styles.fullScreen}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {isLoading ? (
                <LoadingScreen />
              ) : user ? (
                <HomeStack />
              ) : (
                <AuthStack />
              )}
            </LinearGradient>
          </View>
        </SafeAreaProvider>
      </UserContext.Provider>
    </UrlContext.Provider>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});

export default App;
// export default createAppContainer(navigator);
