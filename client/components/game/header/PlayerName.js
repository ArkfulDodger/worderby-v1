import React from "react";
import { View, Text } from "react-native";
import GText from "../../tools/GText.js";

const PlayerName = ({ name }) => {
  return (
    <View>
      <GText>{name}</GText>
    </View>
  );
};

export default PlayerName;
