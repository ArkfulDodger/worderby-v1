import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const PlayerInput = ({ prompt, pNum, playerInput, setPlayerInput }) => {
  const promptLetters = prompt.text.slice(-pNum);
  return (
    <View style={styles.inputContainer}>
      <Text>{promptLetters}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPlayerInput}
        value={playerInput}
        placeholder="sington"
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
  },
});

export default PlayerInput;
