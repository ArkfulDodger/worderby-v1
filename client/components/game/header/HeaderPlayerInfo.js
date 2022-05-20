import React from "react";
import { View, Text } from "react-native";
import PlayerScore from "./PlayerScore";
import PlayerName from "./PlayerName";

const HeaderPlayerInfo = ({ name, score }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "space-between" }}>
      <PlayerScore score={score} />
      <PlayerName name={name} />
    </View>
  );
};

export default HeaderPlayerInfo;
