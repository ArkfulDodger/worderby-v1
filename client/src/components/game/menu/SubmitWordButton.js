import React from "react";
import { Button } from "react-native";
import useURL from "../../../hooks/useURL";
import useMWAPI from "../../../hooks/useMWAPI";
import PButton from "../../tools/PButton";

const SubmitWordButton = ({ game, onWordSubmit }) => {
  const URL = useURL();
  const mwLookup = useMWAPI;

  return (
    <PButton
      onPress={onWordSubmit}
      style={{
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      }}
    >
      Submit
    </PButton>
  );
};

export default SubmitWordButton;
