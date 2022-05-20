import React from "react";
import { Button } from "react-native";

const NewGameButton = (props) => {
  return (
    <Button
      title="New Game"
      onPress={() => console.log("new game button pressed")}
    />
  );
};

export default NewGameButton;
