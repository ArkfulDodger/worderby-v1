import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Keyboard, Platform } from "react-native";
import GText from "../../tools/GText";
import uuid from "react-native-uuid";

// const maxHeight = 80;
const RestrictedEndingsFrame = ({ game, isPlayerTurn, isReadyToContinue }) => {
  const [maxHeight, setMaxHeight] = useState(80);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [frameHeight, setFrameHeight] = useState(0);
  // const prevGame = useRef(game);
  const usePrev = !isPlayerTurn && isReadyToContinue;

  const { restricted_endings } = game;
  const renderedEndings = restricted_endings
    .filter((ending) => {
      let mostRecentWord = game.words[game.words.length - 1];
      let mostRecentSteal = mostRecentWord.text.slice(0, mostRecentWord.p_num);

      return !usePrev || ending !== mostRecentSteal;
    })
    .map((ending) => {
      return (
        <GText key={uuid.v4()} style={styles.text}>
          -{ending}
        </GText>
      );
    });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        if (Platform.OS !== "ios") {
          setMaxHeight(40);
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        if (Platform.OS !== "ios") {
          setMaxHeight(80);
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // useEffect(() => {
  //   prevGame.current = game;
  // }, [game]);

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
