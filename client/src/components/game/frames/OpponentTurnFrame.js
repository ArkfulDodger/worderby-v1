import React from "react";
import { View, Text, StyleSheet } from "react-native";
import OpponentActivityMessage from "../OpponentActivityMessage";
import WordScore from "../WordScore";
import FirstWordMessage from "../FirstWordMessage";

const OpponentTurnFrame = ({ game, user }) => {
  const { player1, player2, prompt } = game;
  const opponent = player1.id === user.id ? player2 : player1;

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topRight}>
        <OpponentActivityMessage opponent={opponent} />
      </View>
      <View style={styles.centered}>
        {prompt.is_first_word ? (
          <FirstWordMessage opponent={opponent} prompt={prompt} />
        ) : (
          <WordScore prompt={prompt} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: "relative",
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OpponentTurnFrame;
