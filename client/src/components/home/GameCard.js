import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../../App";
import GText from "../tools/GText";

const GameCard = ({ game: { item: game }, refresh }) => {
  // console.log("GAMECARD game:", game);

  const URL = useContext(UrlContext);
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  // { player1, player2, turn, round}

  const isOdd = (num) => !!(num % 2);
  const isPlayerTurn =
    (game.player1.id === user.id && isOdd(game.turn)) ||
    (game.player2.id === user.id && !isOdd(game.turn));

  const opponent = game.player1.id === user.id ? game.player2 : game.player1;

  const isReadyToContinue = game.is_word_played_this_turn;

  const buttonText = !game.is_accepted
    ? game.challengee_id === user.id
      ? "Accept"
      : "Cancel"
    : "Play";

  // function isWordPlayedThisRound() {
  //   const round = game.round;
  //   const turn = game.turn;
  //   const wordThisRound = game.words.find(
  //     (word) => word.round_played === round && word.turn_played === turn
  //   );

  //   return !!wordThisRound;
  // }

  const acceptChallenge = () => {
    console.log("accept challenge fired");
    console.log("game:", game);
    console.log("game id:", game.id);

    fetch(URL + `/games/${game.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        is_accepted: true,
      }),
    })
      .then((res) => res.json())
      .then((updatedGame) => {
        console.log("updatedGame:", updatedGame);
        navigation.navigate("Game", { gameData: updatedGame });
      })
      .catch((error) => console.log(error.message));
  };

  const cancelChallenge = () => {
    console.log("cancelling challenge");

    fetch(URL + `/games/${game.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.ok ? refresh() : alert("something went wrong");
      })
      .catch((error) => alert(error.message));
  };

  const getGame = () => {
    fetch(URL + `/games/${game.id}`)
      .then((res) => res.json())
      .then((gameData) => {
        console.log("got game data");
        navigation.navigate("Game", { gameData: gameData });
      })
      .catch((error) => console.log(error.message));
  };

  const onGamePress = () => {
    !game.is_accepted
      ? game.challengee_id === user.id
        ? acceptChallenge()
        : cancelChallenge()
      : getGame();
    // TODO: set buttons not pressable here
  };

  return (
    <View
      style={{ width: 350, margin: 10, padding: 5, backgroundColor: "white" }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <GText style={{ fontWeight: "bold" }}>{opponent.username}</GText>
          {game.is_accepted ? (
            <>
              <GText>Round {game.round}</GText>
              <GText>
                {isPlayerTurn !== isReadyToContinue
                  ? "Your"
                  : opponent.username + "'s"}{" "}
                Turn
              </GText>
            </>
          ) : user.id === game.challenger_id ? (
            <GText>has not accepted your challenge yet</GText>
          ) : (
            <GText>has challenged you to a game</GText>
          )}
        </View>
        {}
        <View
          style={{ width: 100, justifyContent: "center", alignItems: "center" }}
        >
          <Button title={buttonText} onPress={onGamePress} />
        </View>
      </View>
    </View>
  );
};

export default GameCard;
