import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import ApMediumText from "../tools/ApMediumText";

const PlayerInput = ({
  prompt,
  pNum,
  playerInput,
  setPlayerInput,
  setAlertMessage,
}) => {
  const promptLetters = prompt.text.slice(-pNum);

  // ensures only lowercase letters are entered
  const validateInput = (value) => {
    return value.toLowerCase().replace(/[^a-z]/g, "");
  };

  // if a word is entered at once (as with swipe typing), will trip the current
  // prompt from the front of the word, if matching
  const adjustInput = (value) => {
    if (
      value.length - playerInput.length > 1 &&
      value.startsWith(promptLetters)
    ) {
      return value.slice(pNum);
    } else {
      return value;
    }
  };

  const onInputChange = (value) => {
    setAlertMessage("");
    if (value.match(/-/)) {
      setAlertMessage("Cannot play hyphenated words!");
    } else if (value.match(/\s/)) {
      setAlertMessage("Cannot use spaces!");
    }
    const validatedValue = validateInput(value);
    const finalValue = adjustInput(validatedValue);

    setPlayerInput(finalValue);
  };

  return (
    <View style={styles.inputContainer}>
      <ApMediumText style={styles.prompt}>{promptLetters}</ApMediumText>
      <TextInput
        autoFocus={true}
        spellCheck={false}
        underlineColorAndroid={"transparent"}
        style={styles.input}
        onChangeText={onInputChange}
        value={playerInput}
        placeholder=""
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
  },
  input: {
    padding: 0,
    margin: 0,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontFamily: "AppareoMedium",
    fontSize: 43,
  },
  prompt: {
    fontSize: 43,
    color: "#DB00FF",
  },
});

export default PlayerInput;
