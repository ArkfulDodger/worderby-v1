import React from "react";
import { View, Text } from "react-native";

const PlayerScore = ({ score }) => {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>{score}</Text>
    </View>
  );
};

export default PlayerScore;
