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
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PlayerInput
          prompt={prompt}
          pNum={pNum}
          playerInput={playerInput}
          setPlayerInput={setPlayerInput}
        />
      </View>
      <View style={{ flex: 1 }}>
        <PlayerPrompt prompt={prompt} pNum={pNum} setPNum={setPNum} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 30,
  },
});

export default PlayerTurnFrame;
