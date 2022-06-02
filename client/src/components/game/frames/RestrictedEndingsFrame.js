import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import GText from "../../tools/GText";
import uuid from "react-native-uuid";

const RestrictedEndingsFrame = ({ game }) => {
  const { restricted_endings } = game;
  const renderedEndings = restricted_endings.map((ending) => {
    return (
      <GText key={uuid.v4()} style={styles.text}>
        -{ending}
      </GText>
    );
  });

  return (
    <View
      style={{
        backgroundColor: "#6C3300",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderBottomWidth: 1,
        padding: 5,
      }}
    >
      {renderedEndings.length > 0 ? renderedEndings : <GText> </GText>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#FFFF",
    paddingHorizontal: 5,
  },
});

export default RestrictedEndingsFrame;
