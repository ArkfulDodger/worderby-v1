import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WinnerMessage from "./WinnerMessage";

const ResultsFrame = ({ game, user }) => {
  return (
    <View style={styles.container}>
      <WinnerMessage game={game} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResultsFrame;
