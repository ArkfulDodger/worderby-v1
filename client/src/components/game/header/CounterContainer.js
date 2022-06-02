import React, { useState, useEffect } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Counter from "./Counter";

const CounterContainer = ({ timer }) => {
  const size = 80;
  return (
    <LinearGradient
      colors={["#FFF8E8", "#FFE298"]}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderWidth: 4,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Counter timer={timer} />
      </View>
    </LinearGradient>
  );
};

export default CounterContainer;
