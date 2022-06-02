import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../../App";
import GText from "../tools/GText";
import PButton from "../tools/PButton";
import LinearGradient from "react-native-linear-gradient";

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

  const color = !game.is_accepted
    ? "gray"
    : isPlayerTurn !== isReadyToContinue
    ? "#DB00FF"
    : "#CA7900";

  // function isWordPlayedThisRound() {
  //   const round = game.round;
  //   const turn = game.turn;
  //   const wordThisRound = game.words.find(
  //     (word) => word.round_played === round && word.turn_played === turn
  //   );

  //   return !!wordThisRound;
  // }

  const acceptChallenge = () => {
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
        // console.log("got game data");
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
    <LinearGradient
      // colors={["#FFF6F0", "#FFD9BE"]}
      colors={["#FFF6F0", color]}
      style={{ borderWidth: 2, borderRadius: 10, margin: 5 }}
    >
      <View
        style={{
          width: 350,
          margin: 5,
          padding: 5,
          backgroundColor: "#FFFFFFDD",
          borderRadius: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "gray",
            padding: 5,
          }}
        >
          <GText style={{ fontWeight: "bold", fontSize: 25 }}>
            {opponent.username}
          </GText>
          <View
            style={{
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PButton
              style={{
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
              onPress={onGamePress}
              color1="#FFFFFF55"
              color2="#FFF4EB"
            >
              {buttonText}
            </PButton>
          </View>
        </View>
        <View style={{ flex: 1, padding: 5 }}>
          {game.is_accepted ? (
            <View style={{ flexDirection: "row" }}>
              <GText>Round {game.round} - </GText>
              <GText>
                {isPlayerTurn !== isReadyToContinue
                  ? "Your"
                  : opponent.username + "'s"}{" "}
                turn
              </GText>
            </View>
          ) : user.id === game.challenger_id ? (
            <GText>has not accepted your challenge yet</GText>
          ) : (
            <GText>has challenged you to a game</GText>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default GameCard;
