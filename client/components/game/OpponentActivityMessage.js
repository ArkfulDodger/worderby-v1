import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GText from "../tools/GText";

const OpponentActivityMessage = ({ opponent }) => {
  return (
    <View>
      <GText style={styles.message}>{opponent.name}'s turn...</GText>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    color: "#9D5F01",
  },
});

export default OpponentActivityMessage;
