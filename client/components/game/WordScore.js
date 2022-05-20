import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ApExtraLightText from "../tools/ApExtraLightText";
import ApMediumText from "../tools/ApMediumText";
import NumText from "../tools/NumText";

const WordScore = ({ prompt }) => {
  const { text, p_num, score } = prompt;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <ApMediumText style={{ color: "#9A00B4", fontSize: 43 }}>
          {text.slice(0, p_num)}
        </ApMediumText>
        <ApExtraLightText style={{ fontSize: 43 }}>
          {text.slice(p_num)}
        </ApExtraLightText>
      </View>
      <NumText
        style={{
          margin: 10,
          fontSize: 37,
          color: score < 0 ? "red" : score === 0 ? "black" : "#DB00FF",
        }}
      >
        {score > 0 && "+"}
        {score}
      </NumText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  margin: {
    margin: 10,
  },
});

export default WordScore;
