import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WordScore = ({ prompt }) => {
  const { text, p_num, score } = prompt;

  return (
    <View style={styles.container}>
      <Text style={styles.margin}>{text}</Text>
      <Text style={styles.margin}>
        {score > 0 && "+"}
        {score}
      </Text>
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
