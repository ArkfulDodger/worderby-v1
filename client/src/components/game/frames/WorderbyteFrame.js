import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import GText from "../../tools/GText";
import Worderbyte from "../Worderbyte";

const WorderbyteFrame = ({
  game,
  isPlayerTurn,
  readWorderbyte,
  stopReading,
}) => {
  const { worderbyte } = game;

  // useEffect(() => {
  //   return () => stopReading();
  // }, []);

  return (
    <TouchableOpacity onPress={readWorderbyte}>
      <View
        style={{
          backgroundColor: "#FFD1A6",
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottomWidth: 1,
          borderTopWidth: 1,
          padding: 5,
        }}
      >
        <Worderbyte game={game} isPlayerTurn={isPlayerTurn} />
      </View>
    </TouchableOpacity>
  );
};

export default WorderbyteFrame;
