import React, { useState, useEffect, useRef } from "react";
import { View, useWindowDimensions } from "react-native";
import ApMediumText from "../tools/ApMediumText";

const Worderbyte = ({ game }) => {
  const { worderbyte, words } = game;
  const { width: screenWidth } = useWindowDimensions();
  const [worderbyteWidth, setWorderbyteWidth] = useState();
  // const renderWorderbyte = worderbyteBits();
  // console.log("worderbyte:", worderbyte);

  useEffect(() => {
    console.log("wdbyte width:", worderbyteWidth);
    console.log("screen width 0.95:", screenWidth * 0.95);
    const bits = worderbyteBits();
    console.log("bits:", bits);

    if (worderbyteWidth > screenWidth * 0.95) {
      console.log("want to adjust width");
    }
  }, [worderbyteWidth]);

  const worderbyteBits = () => {
    const arr = [];

    console.log("words--------------");
    words.forEach((word) => {
      const bit = word.p_num ? word.text.slice(word.p_num) : word.text;
      arr.push(<ApMediumText style={{ fontSize: 20 }}>{bit}</ApMediumText>);
    });
    console.log("words done--------------");

    return arr;
  };

  return (
    <View
      style={{
        // backgroundColor: "red",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
      onLayout={(event) => {
        // var {x, y, width, height} = event.nativeEvent.layout;
        setWorderbyteWidth(event.nativeEvent.layout.width);
        // console.log("Worderbyte Width:", event.nativeEvent.layout.width);
        // console.log("Screen Width:", screenWidth);
      }}
    >
      {worderbyteBits()}
    </View>
  );
};

export default Worderbyte;
