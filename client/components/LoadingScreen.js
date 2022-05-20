import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import ApExtraLightText from "./tools/ApExtraLightText";
import ApMediumText from "./tools/ApMediumText";

const LoadingScreen = (props) => {
  return (
    <View style={styles.centered}>
      <View style={styles.row}>
        <ApExtraLightText style={[styles.title, styles.pinkFade]}>
          wor
        </ApExtraLightText>
        <ApMediumText style={[styles.title, styles.pink]}>d</ApMediumText>
        <ApMediumText style={[styles.title]}>erby</ApMediumText>
      </View>
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
  row: {
    flexDirection: "row",
    marginVertical: 50,
  },
  title: {
    fontSize: 68,
  },
  pink: {
    color: "#DB00FF",
  },
  pinkFade: {
    color: "#DB00FFB3",
  },
});

export default LoadingScreen;
