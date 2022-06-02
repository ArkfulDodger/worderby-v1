import React, { useState, useEffect } from "react";
import { View } from "react-native";
import NumText from "../../tools/NumText";

const Counter = ({ timer }) => {
  const [color, setColor] = useState("black");

  useEffect(() => {
    if (timer < 0 && color !== "red") {
      setColor("red");
    } else if (timer >= 0 && color !== "black") {
      setColor("black");
    }
  }, [timer]);

  return <NumText style={{ color: color, fontSize: 60 }}>{timer}</NumText>;
};

export default Counter;
