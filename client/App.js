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
import LoadingScreen from "./components/LoadingScreen";
import GameScreen from "./components/GameScreen";
import LinearGradient from "react-native-linear-gradient";
import useURL from "./components/hooks/useURL";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const URL = useURL();

  useEffect(() => {
    fetch(`${URL}/me`)
      .then((r) =>
        r.ok
          ? r.json().then((userData) => {
              console.log(Platform.OS, "user:", userData);
              setUser(userData);
              setIsLoading(false);
            })
          : console.log("couldn't log in")
      )
      .catch((error) => console.error(Platform.OS, "error:", error));
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
        {isLoading ? <LoadingScreen /> : <GameScreen user={user} />}
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
