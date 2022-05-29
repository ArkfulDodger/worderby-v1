import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GText from "../tools/GText";

const OpponentActivityMessage = ({
  opponent,
  isPlayerTurn,
  isReadyToContinue,
}) => {
  const message = isPlayerTurn
    ? `waiting for ${opponent.username} to begin their turn...`
    : isReadyToContinue
    ? "It's your turn! Press Continue when you are ready to play"
    : `${opponent.username} is playing...`;

  return (
    <View>
      <GText style={styles.message}>{message}</GText>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    color: "#9D5F01",
  },
});

export default OpponentActivityMessage;
