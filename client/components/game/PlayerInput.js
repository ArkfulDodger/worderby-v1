import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import ApMediumText from "../tools/ApMediumText";

const PlayerInput = ({ prompt, pNum, playerInput, setPlayerInput }) => {
  const promptLetters = prompt.text.slice(-pNum);
  return (
    <View style={styles.inputContainer}>
      <ApMediumText style={styles.prompt}>{promptLetters}</ApMediumText>
      <TextInput
        style={styles.input}
        onChangeText={setPlayerInput}
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
