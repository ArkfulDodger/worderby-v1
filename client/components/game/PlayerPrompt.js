import React from "react";
import { View, Text } from "react-native";

const PlayerPrompt = ({ prompt, pNum, setPNum }) => {
  return (
    <View>
      <Text>{prompt.text}</Text>
    </View>
  );
};

export default PlayerPrompt;
