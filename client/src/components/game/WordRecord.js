import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import ApMediumText from "../tools/ApMediumText";
import ApExtraLightText from "../tools/ApExtraLightText";
import NumText from "../tools/NumText";

import { UserContext } from "../../../App";

const WordRecord = ({ word: { item: word } }) => {
  const { text, p_num, user_id, score, is_first_word, time_penalty } = word;
  const { user } = useContext(UserContext);
  const isUserWord = user_id === user.id;

  return (
    <View style={{ flexDirection: isUserWord ? "row" : "row-reverse" }}>
      {is_first_word ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ApMediumText style={{ fontSize: 30 }}>{text}</ApMediumText>
        </View>
      ) : (
        <>
          <View
            style={{
              height: 30,
              backgroundColor: "red",
              alignItems: "flex-end",
            }}
          >
            <NumText
              style={{
                lineHeight: 30,
                paddingBottom: 10,
                fontSize: 30,
                // transform: [{ translateY: 10 }],
                color:
                  score < 0
                    ? "red"
                    : score === 0
                    ? "black"
                    : isUserWord
                    ? "#DB00FF"
                    : "#CA7900",
              }}
            >
              {score > 0 && "+"}
              {score}
            </NumText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ApMediumText
              style={{
                color: isUserWord ? "#9A00B4" : "#9D5F01",
                fontSize: 30,
              }}
            >
              {text.slice(0, p_num)}
            </ApMediumText>
            <ApExtraLightText style={{ fontSize: 30 }}>
              {text.slice(p_num)}
            </ApExtraLightText>
          </View>
        </>
      )}
    </View>
  );
};

export default WordRecord;
