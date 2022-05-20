import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GText from "../tools/GText";
import ApMediumText from "../tools/ApMediumText";

const FirstWordMessage = ({ opponent, prompt }) => {
  return (
    <View style={styles.container}>
      <GText style={[styles.margin]}>{opponent.name}'s starting word is:</GText>
      <ApMediumText style={[styles.margin, styles.alt]}>
        {prompt.text}
      </ApMediumText>
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
  bold: {
    fontWeight: "bold",
  },
  alt: {
    color: "#CA7900",
  },
});

export default FirstWordMessage;
