import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Animated,
} from "react-native";
import ApExtraLightText from "../tools/ApExtraLightText";
import ApLightText from "../tools/ApLightText";
import ApMediumText from "../tools/ApMediumText";

const PlayerPrompt = ({ prompt, pNum, setPNum }) => {
  const [onFirstLetter, setOnFirstLetter] = useState(false);
  const dimensions = useWindowDimensions();
  const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
  };
  const onPNumChange = (e) => {
    const perc = 1 - clamp(e.nativeEvent.pageX / dimensions.width, 0, 1);
    const pPosition = Math.ceil(perc * prompt.text.length);
    if (pPosition === prompt.text.length && !onFirstLetter) {
      setOnFirstLetter(true);
    } else if (pPosition !== prompt.text.length && onFirstLetter) {
      setOnFirstLetter(false);
    }
    const pNumCalc = clamp(pPosition, 1, prompt.text.length - 1);
    if (pNumCalc !== pNum) {
      setPNum(pNumCalc);
    }
  };

  return (
    <View
      onStartShouldSetResponder={(e) => {
        onPNumChange(e);
        return true;
      }}
      onResponderMove={onPNumChange}
      onResponderRelease={() => setOnFirstLetter(false)}
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 30,
      }}
    >
      {onFirstLetter ? (
        <ApLightText style={{ color: "red" }}>
          {prompt.text.slice(0, 1)}
        </ApLightText>
      ) : (
        <ApExtraLightText style={styles.unused}>
          {prompt.text.slice(0, 1)}
        </ApExtraLightText>
      )}
      <ApExtraLightText style={styles.unused}>
        {prompt.text.slice(1, -pNum)}
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
