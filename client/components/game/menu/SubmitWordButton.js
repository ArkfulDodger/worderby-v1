import React from "react";
import { Button } from "react-native";
import useURL from "../../hooks/useURL";

const SubmitWordButton = ({ game }) => {
  const URL = useURL();

  // const cycleTurn = () => {
  //   const updates = {
  //     round: game.turn === 2 ? game.round + 1 : game.round,
  //     turn: game.turn === 1 ? 2 : 1,
  //   };

  //   if (updates.round > game.num_rounds) {
  //     updates = { is_over: true };
  //   }

  //   console.log("updates", updates);

  //   fetch(URL + "/games/" + game.id, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(updates),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("data", data))
  //     .catch((error) => console.log(error.message));
  // };

  return <Button title="Submit" onPress={() => "word submit clicked"} />;
};

export default SubmitWordButton;
