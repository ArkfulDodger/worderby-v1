import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Title from "../components/Title";

const LoadingScreen = (props) => {
  return (
    <View style={styles.centered}>
      <Title />
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
