import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const LoadingScreen = (props) => {
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>worderby</Text>
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
  title: {
    fontSize: 20,
  },
});

export default LoadingScreen;
