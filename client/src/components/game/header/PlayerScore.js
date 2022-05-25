import React from "react";
import { View, Text } from "react-native";
import NumText from "../../tools/NumText";

const PlayerScore = ({ isPlayer, score }) => {
  return (
    <View style={{ height: 40, alignItems: "flex-end" }}>
      <NumText
        style={{
          fontSize: 48,
          lineHeight: 48,
          paddingTop: 10,
          color: isPlayer ? "#DB00FF" : "#CA7900",
          // transform: [{ translateY: 10 }],
          // alignSelf: "flex-end",
          // backgroundColor: "red",
        }}
      >
        {score}
      </NumText>
    </View>
  );
};

export default PlayerScore;
