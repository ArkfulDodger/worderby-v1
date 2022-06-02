import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import ApMediumText from "../tools/ApMediumText";

const Worderbyte = ({ game }) => {
  const { worderbyte, words } = game;

  const worderbyteBits = () => {
    const arr = [];

    words.forEach((word) => {
      const bit = word.p_num ? word.text.slice(word.p_num) : word.text;
      arr.push(
        <ApMediumText key={word.id} style={{ fontSize: 20 }}>
          {bit}
        </ApMediumText>
      );
    });

    return arr;
  };

  return (
    <View
      style={{
        // backgroundColor: "red",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {worderbyteBits()}
    </View>
  );
};

export default Worderbyte;
