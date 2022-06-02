import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import GText from "../../tools/GText";
import uuid from "react-native-uuid";

const maxHeight = 80;
const RestrictedEndingsFrame = ({ game }) => {
  const [frameHeight, setFrameHeight] = useState(0);

  const { restricted_endings } = game;
  const renderedEndings = restricted_endings.map((ending) => {
    return (
      <GText key={uuid.v4()} style={styles.text}>
        -{ending}
      </GText>
    );
  });

  const restrictedView = (
    <View
      style={styles.defaultContainer}
      onLayout={(event) => {
        setFrameHeight(event.nativeEvent.layout.height);
      }}
    >
      {renderedEndings.length > 0 ? renderedEndings : <GText> </GText>}
    </View>
  );

  return frameHeight > maxHeight ? (
    <View style={{ height: maxHeight }}>
      <ScrollView
        style={{
          height: maxHeight,
          bounces: false,
          backgroundColor: "#6C3300",
        }}
      >
        {restrictedView}
      </ScrollView>
    </View>
  ) : (
    restrictedView
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    backgroundColor: "#6C3300",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 5,
  },
  text: {
    color: "#FFFF",
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
});

export default RestrictedEndingsFrame;
