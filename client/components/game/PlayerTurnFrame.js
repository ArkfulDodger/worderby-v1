import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import PlayerPrompt from "./PlayerPrompt";
import PlayerInput from "./PlayerInput";

const PlayerTurnFrame = ({
  game,
  user,
  pNum,
  setPNum,
  playerInput,
  setPlayerInput,
}) => {
  const { prompt } = game;

  // set default selected prompt letters to all available on turn start
  useEffect(() => {
    setPNum(prompt.text.length - 1);
  }, []);

  return (
    <View style={styles.container}>
      <View></View>
      <PlayerInput
        prompt={prompt}
        pNum={pNum}
        playerInput={playerInput}
        setPlayerInput={setPlayerInput}
      />
      <PlayerPrompt prompt={prompt} pNum={pNum} setPNum={setPNum} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    margin: 30,
  },
});

export default PlayerTurnFrame;
