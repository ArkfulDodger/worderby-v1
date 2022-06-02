import React, { useState, useEffect } from "react";
import { View } from "react-native";
import GText from "../../tools/GText";
import Worderbyte from "../Worderbyte";

const WorderbyteFrame = ({ game }) => {
  const { worderbyte } = game;

  return (
    <View
      style={{
        backgroundColor: "#FFD1A6",
        justifyContent: "flex-end",
        alignItems: "center",
        borderBottomWidth: 1,
        padding: 5,
      }}
    >
      <Worderbyte game={game} />
    </View>
  );
};

export default WorderbyteFrame;
