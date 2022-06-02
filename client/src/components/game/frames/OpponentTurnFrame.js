import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import OpponentActivityMessage from "../OpponentActivityMessage";
import WordScore from "../WordScore";
import FirstWordMessage from "../FirstWordMessage";

const OpponentTurnFrame = ({
  game,
  user,
  isPlayerTurn,
  isReadyToContinue,
  playBotTurn,
}) => {
  const { player1, player2, prompt } = game;
  const opponent = player1.id === user.id ? player2 : player1;
  const player = player1.id === user.id ? player1 : player2;
  const playersWords = game.words.filter((word) => word.user_id === user.id);
  // console.log("playersWords:", playersWords);
  const playerMostRecentWord = playersWords[playersWords.length - 1];
  // TODO: fix this so it actually looks for word by round/turn, not just last in array

  useEffect(() => {
    if (game.is_single_player && !isPlayerTurn && !isReadyToContinue) {
      console.log("Bot would play here!");
      const botTimeout = setTimeout(() => {
        playBotTurn(game);
      }, 1000);

      return () => clearTimeout(botTimeout);
    }
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topRight}>
        <OpponentActivityMessage
          opponent={opponent}
          isPlayerTurn={isPlayerTurn}
          isReadyToContinue={isReadyToContinue}
        />
      </View>
      <View style={styles.centered}>
        {!playerMostRecentWord ? (
          <FirstWordMessage opponent={opponent} prompt={prompt} />
        ) : (
          <WordScore prompt={playerMostRecentWord} />
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
