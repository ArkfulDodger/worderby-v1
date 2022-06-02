import React, { useState, useEffect, useRef, useContext } from "react";
import { View } from "react-native";
import ApMediumText from "../tools/ApMediumText";
import { UserContext } from "../../../App";

const Worderbyte = ({ game, isPlayerTurn }) => {
  const { worderbyte, words } = game;
  const { user } = useContext(UserContext);

  const worderbyteBits = () => {
    const arr = [];

    words.forEach((word) => {
      if (
        !isPlayerTurn &&
        word.round_played === game.round &&
        word.user_id !== user.id
      ) {
        return;
      }

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
