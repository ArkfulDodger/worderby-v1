import React, { useState, useEffect, useContext } from "react";
import { View, Platform } from "react-native";
import ApMediumText from "../tools/ApMediumText";
import ApExtraLightText from "../tools/ApExtraLightText";
import NumText from "../tools/NumText";

import { UserContext } from "../../../App";

const WordRecord = ({ word: { item: word } }) => {
  const { text, p_num, user_id, score, is_first_word, time_penalty } = word;
  const { user } = useContext(UserContext);
  const isUserWord = user_id === user.id;

  return (
    <View style={{ marginVertical: Platform.OS === "ios" ? 3 : 1 }}>
      <View
        style={{
          flexDirection: isUserWord ? "row" : "row-reverse",
          alignItems: "center",
          // backgroundColor: "blue",
        }}
      >
        {is_first_word ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ApMediumText style={{ fontSize: 30, color: "gray" }}>
              {text}
            </ApMediumText>
          </View>
        ) : (
          <>
            <View
              style={{
                height: 30,
                // backgroundColor: "red",
                alignItems: "flex-end",
              }}
            >
              <NumText
                style={{
                  lineHeight: 30,
                  paddingTop: 8,
                  fontSize: 30,
                  marginHorizontal: 10,
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
                  lineHeight: 30,
                }}
              >
                {text.slice(0, p_num)}
              </ApMediumText>
              <ApExtraLightText style={{ fontSize: 30, lineHeight: 30 }}>
                {text.slice(p_num)}
              </ApExtraLightText>
            </View>
          </>
        )}
      </View>
      <View
        style={{
          height: 20,
          flexDirection: isUserWord ? "row" : "row-reverse",
          // backgroundColor: "red",
          alignItems: "flex-end",
          marginHorizontal: 40,
        }}
      >
        <NumText
          style={{
            lineHeight: 20,
            paddingTop: 5,
            fontSize: 20,

            // transform: [{ translateY: 10 }],
            color: "red",
          }}
        >
          {time_penalty < 0 ? time_penalty : ""}
        </NumText>
      </View>
    </View>
  );
};

export default WordRecord;
