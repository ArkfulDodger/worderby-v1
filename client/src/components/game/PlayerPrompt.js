import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Animated,
  Keyboard,
  Platform,
} from "react-native";
import ApExtraLightText from "../tools/ApExtraLightText";
import ApLightText from "../tools/ApLightText";
import ApMediumText from "../tools/ApMediumText";

const PlayerPrompt = ({ prompt, pNum, setPNum, setAlertMessage }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [padding, setPadding] = useState(30);
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
      setAlertMessage("Cannot select the entire prompt!");
    } else if (pPosition !== prompt.text.length && onFirstLetter) {
      setOnFirstLetter(false);
      setAlertMessage("");
    }
    const pNumCalc = clamp(pPosition, 1, prompt.text.length - 1);
    if (pNumCalc !== pNum) {
      setPNum(pNumCalc);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        if (Platform.OS !== "ios") {
          setPadding(0);
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        if (Platform.OS !== "ios") {
          setPadding(30);
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      onStartShouldSetResponder={(e) => {
        setAlertMessage("");
        onPNumChange(e);
        return true;
      }}
      onResponderMove={onPNumChange}
      onResponderRelease={() => {
        setOnFirstLetter(false);
        setAlertMessage("");
      }}
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: padding,
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
