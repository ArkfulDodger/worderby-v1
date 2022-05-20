import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GText from "../tools/GText";

const FirstWordMessage = ({ opponent, prompt }) => {
  return (
    <View style={styles.container}>
      <GText style={styles.margin}>{opponent.name}'s starting word is:</GText>
      <Text style={styles.margin}>{prompt.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  margin: {
    margin: 10,
  },
});

export default FirstWordMessage;
