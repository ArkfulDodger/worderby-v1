import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WinnerMessage = ({ game }) => {
  const isTie = game.player1_score === game.player2_score;
  const winner =
    game.player1_score > game.player2_score ? game.player1 : game.player2;

  return (
    <View style={styles.container}>
      {isTie ? (
        <Text>Tied Game!</Text>
      ) : (
        <>
          <Text>{winner.name}</Text>
          <Text>wins!</Text>
        </>
      )}
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

export default WinnerMessage;
