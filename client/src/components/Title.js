import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import ApExtraLightText from "../components/tools/ApExtraLightText";
import ApMediumText from "../components/tools/ApMediumText";

const Title = ({ size = 68 }) => {
  return (
    <View style={[styles.row]}>
      <ApExtraLightText style={[{ fontSize: size }, styles.pinkFade]}>
        wor
      </ApExtraLightText>
      <ApMediumText style={[{ fontSize: size }, styles.pink]}>d</ApMediumText>
      <ApMediumText style={[{ fontSize: size }]}>erby</ApMediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 20,
  },
  pink: {
    color: "#DB00FF",
  },
  pinkFade: {
    color: "#DB00FFB3",
  },
});

export default Title;
