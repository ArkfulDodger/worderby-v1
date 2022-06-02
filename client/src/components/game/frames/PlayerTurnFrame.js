import React, { useState, useEffect, useRef, setTimerActive } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import PlayerPrompt from "../PlayerPrompt";
import PlayerInput from "../PlayerInput";
import AlertMessage from "../AlertMessage";

const PlayerTurnFrame = ({
  game,
  user,
  pNum,
  setPNum,
  playerInput,
  setPlayerInput,
  alertMessage,
  setAlertMessage,
  setTimerActive,
  setTimer,
  setBackDisabled,
  startTimer,
}) => {
  const { prompt } = game;

  // set default selected prompt letters to all available on turn start
  useEffect(() => {
    setPlayerInput("");
    setPNum(prompt.text.length - 1);
    startTimer();
    setBackDisabled(true);

    return () => setBackDisabled(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <AlertMessage alertMessage={alertMessage} />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PlayerInput
          prompt={prompt}
          pNum={pNum}
          playerInput={playerInput}
          setPlayerInput={setPlayerInput}
          setAlertMessage={setAlertMessage}
        />
      </View>
      <View style={{ flex: 1 }}>
        <PlayerPrompt
          prompt={prompt}
          pNum={pNum}
          setPNum={setPNum}
          setAlertMessage={setAlertMessage}
        />
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
