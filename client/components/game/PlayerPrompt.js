import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ApExtraLightText from "../tools/ApExtraLightText";
import ApMediumText from "../tools/ApMediumText";

const PlayerPrompt = ({ prompt, pNum, setPNum }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <ApExtraLightText style={styles.unused}>
        {prompt.text.slice(0, -pNum)}
      </ApExtraLightText>
      <ApMediumText style={styles.used}>
        {prompt.text.slice(-pNum)}
      </ApMediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  unused: {
    color: "#B15CBF80",
  },
  used: {
    color: "#9A00B4",
  },
});

export default PlayerPrompt;
