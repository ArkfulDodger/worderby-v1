import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const TurnIndicators = (isPlayer, game, playerTurn) => {
  //"⚫️🟢🔴⭕🔘🟣🟠"
  const filled = isPlayer ? "🟣" : "🟠";
  const empty = "🔘";

  const round3 = game.round === 3 && game.turn >= playerTurn ? filled : empty;
  const round2 =
    game.round > 2 || (game.round === 2 && game.turn >= playerTurn)
      ? filled
      : empty;
  const round1 = game.round > 1 || game.turn >= playerTurn ? filled : empty;

  return (
    <View
      style={{
        alignItems: "space-between",
        padding: 5,
      }}
    >
      <Text style={styles.bullets}>{round3}</Text>
      <Text style={styles.bullets}>{round2}</Text>
      <Text style={styles.bullets}>{round1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bullets: {
    fontSize: 15,
    padding: 2,
  },
});

export default TurnIndicators;
