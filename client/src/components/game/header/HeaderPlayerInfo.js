import React from "react";
import { View, Text } from "react-native";
import PlayerScore from "./PlayerScore";
import PlayerName from "./PlayerName";

const HeaderPlayerInfo = ({ isPlayer, name, score, timer }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 10,
      }}
    >
      <PlayerScore flex={1} isPlayer={isPlayer} score={score} timer={timer} />
      <PlayerName name={name} />
    </View>
  );
};

export default HeaderPlayerInfo;
