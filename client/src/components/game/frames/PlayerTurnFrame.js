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
  readWorderbyte,
  stopReading,
}) => {
  const { prompt } = game;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [flexVal, setFlexVal] = useState(1);

  // set default selected prompt letters to all available on turn start
  useEffect(() => {
    readWorderbyte();

    setPlayerInput("");
    setPNum(prompt.text.length - 1);
    startTimer();
    setBackDisabled(true);

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        if (Platform.OS !== "ios") {
          setFlexVal(0);
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        if (Platform.OS !== "ios") {
          setFlexVal(1);
        }
      }
    );

    return () => {
      setBackDisabled(false);
      stopReading();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: flexVal }}>
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
