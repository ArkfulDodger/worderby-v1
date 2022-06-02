import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import GText from "../components/tools/GText";
import { useNavigation } from "@react-navigation/native";
import { UrlContext, UserContext } from "../../App";
import PButton from "../components/tools/PButton";

const StartNewGameScreen = ({
  route: {
    params: { currentSinglePlayerGame },
  },
}) => {
  const URL = useContext(UrlContext);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const onSinglePlayerPress = () => {
    if (currentSinglePlayerGame) {
      getGame();
    } else {
      startSinglePlayer();
    }
  };

  const goToNewSinglePlayerGame = (game) => {
    navigation.goBack();
    setTimeout(() => navigation.navigate("Game", { gameData: game }), 200);
  };

  const getGame = () => {
    fetch(URL + `/games/${currentSinglePlayerGame.id}`)
      .then((res) => res.json())
      .then((gameData) => {
        goToNewSinglePlayerGame(gameData);
      })
      .catch((error) => console.log(error.message));
  };

  const startSinglePlayer = () => {
    console.log("single player pressed");
    fetch(URL + "/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        player1_id: user.id,
        player2_id: null,
        is_over: false,
        num_rounds: 3,
        round: 1,
        turn: 1,
        player1_score: 0,
        player2_score: 0,
        is_single_player: true,
        is_accepted: true,
        challenger_id: user.id,
        challengee_id: null,
        streak: 1,
      }),
    })
      .then((res) => res.json())
      .then((newGameData) => {
        goToNewSinglePlayerGame(newGameData);
      })
      .catch((error) => console.log(error.message));
  };

  const openFriendsList = () => {
    navigation.goBack();
    setTimeout(
      () => navigation.navigate("HomeTabs", { screen: "FriendsList" }),
      200
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LinearGradient
        colors={["#FFFFFF", "#FFE2CD"]}
        style={styles.modalContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ marginBottom: 30, marginTop: 20 }}>
          <GText style={{ fontWeight: "bold", fontSize: 20 }}>
            Start a Game
          </GText>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <PButton onPress={onSinglePlayerPress}>
            {!!currentSinglePlayerGame
              ? "Continue Single Player"
              : "Single Player"}
          </PButton>
          <PButton onPress={openFriendsList}>Challenge a Friend</PButton>
          <PButton onPress={() => navigation.goBack()}>Close</PButton>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: "white",
    width: 300,
    height: 400,
    padding: 30,
    alignItems: "center",
    // justifyContent: "space-between",
    borderRadius: 20,
    // borderColor: "#FFD1A6",
    // borderWidth: 5,
    // overflow: "hidden",
  },
});

export default StartNewGameScreen;
